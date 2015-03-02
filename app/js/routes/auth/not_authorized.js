var React = require("react"),
    PageNotAuthorized = require("../../components/auth/page_not_authorized"),
    app = require("../../app");


app.router.route(
    "/not_authorized",
    function(ctx, next) {
        React.render(
            React.createElement(PageNotAuthorized, {
                ctx: ctx
            }), app.node
        );
        ctx.end();
        next();
    }
);
