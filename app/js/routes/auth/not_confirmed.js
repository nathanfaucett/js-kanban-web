var React = require("react"),
    renderNotConfirmed = require("../../pages/auth/not_confirmed"),
    app = require("../../app");


app.router.route(
    "/not_confirmed",
    function(ctx, next) {
        React.render(renderNotConfirmed(ctx), app.node);
        ctx.end();
        next();
    }
);
