var UserStore = require("../../stores/user_store"),
    app = require("../../app");


app.router.route(
    "/one_time/:token",
    function(ctx) {
        UserStore.signInWithOneTimeToken(ctx.query.email, ctx.params.token, function(err) {
            if (err) {
                app.page.go("/not_authorized");
            } else {
                app.page.go("/");
            }
        });
    }
);
