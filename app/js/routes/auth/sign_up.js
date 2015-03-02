var React = require("react"),
    renderSignUp = require("../../pages/auth/sign_up"),
    app = require("../../app");


app.router.route(
    "/sign_up",
    function(ctx, next) {
        React.render(renderSignUp(ctx), app.node);
        ctx.end();
        next();
    }
);
