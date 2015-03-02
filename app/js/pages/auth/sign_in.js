var React = require("react"),
    LayoutNoHeader = require("../../components/layouts/layout_no_header"),
    SignIn = require("../../components/auth/sign_in");


module.exports = function(ctx) {
    return (
        React.createElement(LayoutNoHeader, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement(SignIn, null)
                    )
                );
            }
        })
    );
};
