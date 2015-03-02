var UserStore = require("../../stores/user_store"),
    app = require("../../app");


app.router.route(
    "/sign_out",
    function() {
        app.dispatcher.handleViewAction({
            actionType: UserStore.consts.USER_SIGN_OUT
        });
        app.page.go("/sign_in");
    }
);
