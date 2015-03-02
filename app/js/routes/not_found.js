var React = require("react"),
    HttpError = require("http_error"),
    PageNotFound = require("../components/page_not_found"),
    app = require("../app");


app.router.use(
    function(ctx, next) {
        if (ctx.route) {
            next();
        } else {
            React.render(
                React.createElement(PageNotFound, {
                    ctx: ctx
                }),
                app.node
            );
            next(new HttpError(404));
        }
    }
);
