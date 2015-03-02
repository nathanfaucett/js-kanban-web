var React = require("react"),
    HttpError = require("http_error"),
    renderNotFound = require("../pages/not_found"),
    app = require("../app");


app.router.use(
    function(ctx, next) {
        console.log(ctx.route);

        if (ctx.route) {
            next();
        } else {
            React.render(renderNotFound(ctx), app.node);
            next(new HttpError(404));
        }
    }
);
