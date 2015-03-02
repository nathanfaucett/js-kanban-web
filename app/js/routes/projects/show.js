var React = require("react"),
    renderProject = require("../../pages/projects/show"),
    app = require("../../app");


app.router.route(
    "/projects/:id[0-9]",
    function(ctx, next) {
        React.render(renderProject(ctx), app.node);
        ctx.end();
        next();
    }
);
