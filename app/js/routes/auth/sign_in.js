var React = require("react"),
    renderSignIn = require("../../pages/auth/sign_in"),
    app = require("../../app");


app.router.route(
    "/sign_in",
    function(ctx, next) {
        React.render(renderSignIn(ctx), app.node);
        ctx.end();
        next();
    }
);
