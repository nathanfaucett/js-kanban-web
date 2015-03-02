var i18n = require("i18n"),
    request = require("request"),
    fastSlice = require("fast_slice"),
    UserStore = require("../../stores/user_store");


var cache = {};


function i18nMiddleware(ctx, next) {
    var locale = UserStore.getLocale();

    ctx.i18n = function(key) {
        return i18n(locale, key, fastSlice(arguments, 1));
    };

    ctx.loadLocale = function(locale, callback) {
        request.get("locale/" + locale + ".json", {
            success: function(response) {
                cache[locale] = true;
                i18n.add(locale, response.data);
                callback();
            },
            error: function(response) {
                callback(response.data);
            }
        });
    };

    if (cache[locale] === true) {
        next();
    } else {
        ctx.loadLocale(locale, next);
    }
}


module.exports = i18nMiddleware;
