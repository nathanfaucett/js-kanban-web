var UserStore = require("../../stores/user_store"),
    app = require("../../app");


app.router.route(
    "/confirm_account",
    function(ctx) {
        var query = ctx.query;

        UserStore.confirmEmail(query.email, query.expires_at, query.token, function() {
            app.page.go("/");
        });
    }
);
