var React = require("react"),
    renderAccount = require("../pages/account"),
    app = require("../app");


app.router.route(
    "/account",
    function(ctx, next) {
        React.render(renderAccount(ctx), app.node);
        ctx.end();
        next();
    }
);
