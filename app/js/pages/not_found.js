var React = require("react"),
    UserStore = require("../stores/user_store"),
    LayoutApp = require("../components/layouts/layout_app"),
    LayoutNoHeader = require("../components/layouts/layout_no_header");


module.exports = function(ctx) {
    return (
        React.createElement(UserStore.isSignedIn() ? LayoutApp : LayoutNoHeader, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement("h1", null, ctx.i18n("errors.not_found"))
                    )
                );
            }
        })
    );
};
