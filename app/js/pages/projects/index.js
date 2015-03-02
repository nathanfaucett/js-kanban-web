var React = require("react"),
    LayoutApp = require("../../components/layouts/layout_app"),
    ProjectList = require("../../components/projects/project_list");


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
                                className: "page projects"
                            },
                            React.createElement("h1", {
                                className: "title"
                            }, ctx.i18n("page.projects")),
                            React.createElement(ProjectList, null)
                        )
                    )
                );
            }
        })
    );
};
