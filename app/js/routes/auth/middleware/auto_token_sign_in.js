var page = require("page"),
    cookies = require("cookies"),
    UserStore = require("../../../stores/user_store");


function autoTokenSignIn(ctx, next) {
    var apiToken = cookies.get("api_token"),
        user = UserStore.user;

    if (apiToken && apiToken !== user.api_token) {
        UserStore.signInWithApiToken(apiToken, function(err) {
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
