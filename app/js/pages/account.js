var React = require("react"),
    LayoutApp = require("../components/layouts/layout_app");


module.exports = function(ctx) {
    return (
        React.createElement(LayoutApp, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement("h1", null, ctx.i18n("pages.account"))
                    )
                );
            }
        })
    );
};
