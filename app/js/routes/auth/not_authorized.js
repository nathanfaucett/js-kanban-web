var React = require("react"),
    renderNotAuthorized = require("../../pages/auth/not_authorized"),
    app = require("../../app");


app.router.route(
    "/not_authorized",
    function(ctx, next) {
        React.render(renderNotAuthorized(ctx), app.node);
        ctx.end();
        next();
    }
);
