var React = require("react"),
    LayoutNoHeader = require("../../components/layouts/layout_no_header");


module.exports = function(ctx) {
    return (
        React.createElement(LayoutNoHeader, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement("h1", null, ctx.i18n("errors.not_authorized"))
                    )
                );
            }
        })
    );
};
