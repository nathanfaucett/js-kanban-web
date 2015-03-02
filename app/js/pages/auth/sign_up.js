var React = require("react"),
    LayoutNoHeader = require("../../components/layouts/layout_no_header"),
    SignUp = require("../../components/auth/sign_up");


module.exports = function(ctx) {
    return (
        React.createElement(LayoutNoHeader, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement(SignUp, null)
                    )
                );
            }
        })
    );
};
