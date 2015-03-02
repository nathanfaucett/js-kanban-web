var page = require("page"),
    cookies = require("cookies"),
    UserStore = require("../../../stores/user_store");


function autoTokenSignIn(ctx, next) {
    var apiKey = cookies.get("api_key"),
        user = UserStore.user;

    if (apiKey && apiKey !== user.api_key) {
        UserStore.signInWithApiToken(apiKey, function(err) {
            if (err) {
                page.go("/sign_in");
            } else {
                next();
            }
        });
    } else {
        next();
    }
}


module.exports = autoTokenSignIn;
