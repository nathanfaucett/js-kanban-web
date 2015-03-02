var React = require("react"),
    PageSignUp = require("../../components/auth/page_sign_up"),
    app = require("../../app");


app.router.route(
    "/sign_up",
    function(ctx, next) {
        React.render(
            React.createElement(PageSignUp, {
                ctx: ctx
            }),
            app.node
        );
        ctx.end();
        next();
    }
);
