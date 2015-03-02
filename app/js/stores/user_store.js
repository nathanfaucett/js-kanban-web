var cookies = require("cookies"),
    indexOf = require("index_of"),
    request = require("request"),
    emptyFunction = require("empty_function"),
    config = require("../config"),
    UserConsts = require("../consts/user_consts"),
    Store = require("./store");


var UserStore = new Store(),

    navigatorLanguage = (
        navigator.language ||
        (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) ||
        "en"
    ),

    defaultLocale = indexOf(config.locales, navigatorLanguage) !== -1 ? navigatorLanguage : config.locales[0];


UserStore.consts = UserConsts;


UserStore.user = {
    api_token: null,
    confirmed: false,
    email: null,
    locale: defaultLocale
};

function updateUser(data, callback) {
    request.patch(config.apiUrl + "/sessions", data, {
        success: function(response) {
            callback(undefined, response.data);
        },
        error: function(response) {
            callback(response);
        }
    });
}

UserStore.getLocale = function() {
    var locale = cookies.get("locale");

    if (!locale) {
        locale = UserStore.user.locale;
        cookies.set("locale", locale);
    }

    return locale;
};

UserStore.setLocale = function(value, callback) {
    var changed = setLocale(value);

    if (changed) {
        updateUser({
            locale: value
        }, callback || emptyFunction);
    }

    return changed;
};

function setLocale(value) {
    var last = cookies.get("locale");

    value = indexOf(config.locales, value) === -1 ? config.locales[0] : value;

    if (last !== value) {
        cookies.set("locale", value);
        return true;
    } else {
        return false;
    }
}

UserStore.isSignedIn = function() {
    return UserStore.user.api_token !== null;
};

UserStore.confirmEmail = function(email, expiresAt, token, callback) {
    request.patch(config.apiUrl + "/confirmations", {
        email: email,
        expires_at: expiresAt,
        token: token
    }, {
        success: function() {
            UserStore.user.confirmed = true;
            callback();
        },
        error: function(response) {
            callback(response);
        }
    });
};

UserStore.resendConfirmEmail = function(email, callback) {
    request.post(config.apiUrl + "/confirmations", {
        email: email
    }, {
        success: function() {
            callback();
        },
        error: function(response) {
            callback(response);
        }
    });
};

function signUserIn(data) {
    var user = UserStore.user;

    user.api_token = data.api_key;
    user.locale = data.locale || defaultLocale;
    user.confirmed = data.confirmed;
    user.email = data.email;

    cookies.set("api_token", data.api_key);
    cookies.set("locale", user.locale);
    request.defaults.headers["X-Testcloud-Token"] = data.api_key;
}

function signUserOut() {
    var user = UserStore.user;

    user.api_token = null;
    user.confirmed = false;
    user.email = null;

    cookies.remove("api_token");
    delete request.defaults.headers["X-Testcloud-Token"];
}

UserStore.signInWithApiToken = function(api_token, callback) {
    request.get(config.apiUrl + "/sessions", {
        headers: {
            "X-Testcloud-Token": api_token
        },
        success: function(response) {
            var user = response.data;

            signUserIn(user);
            callback(undefined, user);
        },
        error: function(response) {
            signUserOut();
            callback(response);
        }
    });
};

UserStore.signInWithCredentials = function(email, password, callback) {
    request.post(config.apiUrl + "/sessions", {
        email: email,
        password: password
    }, {
        success: function(response) {
            var user = response.data;

            signUserIn(user);
            callback(undefined, user);
        },
        error: function(response) {
            callback(response);
        }
    });
};

UserStore.signInWithOneTimeToken = function(email, token, callback) {
    request.post(config.apiUrl + "/otp_verify", {
        email: email,
        otp: token
    }, {
        success: function(response) {
            var user = response.data;

            signUserIn(user);
            callback(undefined, user);
        },
        error: function(response) {
            callback(response);
        }
    });
};

UserStore.signUp = function(email, password, firstname, lastname, locale, callback) {
    request.post(config.apiUrl + "/registrations", {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
            //locale: locale
    }, {
        success: function(response) {
            var user = response.data;

            signUserIn(user);
            callback(undefined, user);
        },
        error: function(response) {
            callback(response);
        }
    });
};

UserStore.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {

        case UserConsts.USER_SIGN_OUT:
            signUserOut();
            UserStore.emit("signOut");
            break;

        case UserConsts.USER_SIGN_UP:
            UserStore.signUp(
                action.email, action.password, action.firstname, action.lastname, action.locale,
                function(err, user) {
                    if (err) {
                        UserStore.emit("signUp", err.data.errors);
                    } else {
                        UserStore.emit("signUp", undefined, user);
                    }
                }
            );
            break;

        case UserConsts.USER_SIGN_IN:
            UserStore.signInWithCredentials(action.email, action.password, function(err, user) {
                if (err) {
                    UserStore.emit("signIn", err.data.errors);
                } else {
                    UserStore.emit("signIn", undefined, user);
                }
            });
            break;

        case UserConsts.USER_CHANGE_LOCALE:
            if (UserStore.setLocale(action.locale)) {
                UserStore.emit("changeLocale");
            }
            break;

        case UserConsts.USER_RESEND_CONFIRMATION:
            UserStore.resendConfirmEmail(action.email, function(err) {
                if (err) {
                    UserStore.emit("resendConfirmation", err.data.errors);
                } else {
                    UserStore.emit("resendConfirmation");
                }
            });
            break;
    }
});


module.exports = UserStore;
