var page = require("page"),
    cookies = require("cookies");


function auth(ctx, next) {
    var pathname;

    if (!cookies.get("api_token")) {
        pathname = ctx.pathname;

        if (pathname === "/sign_up") {
            page.go("/sign_up");
        } else {
            page.go("/sign_in");
        }
    } else {
        next();
    }
}


module.exports = auth;
