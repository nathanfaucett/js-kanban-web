var React = require("react"),
    PageSignIn = require("../../components/auth/page_sign_in"),
    app = require("../../app");


app.router.use(
    "/sign_in",
    function(ctx, next) {
        React.render(
            React.createElement(PageSignIn, {
                ctx: ctx
            }),
            app.node
        );
        ctx.end();
        next();
    }
);
