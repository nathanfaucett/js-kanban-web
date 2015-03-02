var React = require("react"),
    renderProjects = require("../../pages/projects"),
    app = require("../../app");


app.router.route(
    function(ctx, next) {
        React.render(renderProjects(ctx), app.node);
        ctx.end();
        next();
    }
);
