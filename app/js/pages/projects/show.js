var React = require("react"),
    LayoutApp = require("../../components/layouts/layout_app"),
    Project = require("../../components/projects/project");


module.exports = function(ctx) {
    return (
        React.createElement(LayoutApp, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement("div", {
                                className: "page project"
                            },
                            React.createElement("h1", {
                                className: "title"
                            }, ctx.i18n("page.project")),
                            React.createElement(Project, null)
                        )
                    )
                );
            }
        })
    );
};
