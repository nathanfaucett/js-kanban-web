var React = require("react"),
    PageNotConfirmed = require("../../components/auth/page_not_confirmed"),
    app = require("../../app");


app.router.route(
    "/not_confirmed",
    function(ctx, next) {
        React.render(
            React.createElement(PageNotConfirmed, {
                ctx: ctx
            }), app.node
        );
        ctx.end();
        next();
    }
);
