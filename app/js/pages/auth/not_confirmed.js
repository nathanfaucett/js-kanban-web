var React = require("react"),
    LayoutNoHeader = require("../../components/layouts/layout_no_header"),
    UserStore = require("../../stores/user_store"),
    dispatcher = require("../../dispatcher");


function onResend() {
    dispatcher.handleViewAction({
        actionType: UserStore.consts.USER_RESEND_CONFIRMATION,
        email: UserStore.user.email
    });
}


module.exports = function(ctx) {
    var i18n = ctx.i18n;
    return (
        React.createElement(LayoutNoHeader, {
            ctx: ctx,
            render: function() {
                return (
                    React.createElement("div", {
                            className: "wrap"
                        },
                        React.createElement("div", {
                                className: "not-confirmed"
                            },
                            React.createElement("h2", null,
                                i18n("errors.confirm_email")
                            ),
                            React.createElement("p", null,
                                i18n("errors.confirm_email_desc", UserStore.user.email)
                            ),
                            React.createElement("p", null,
                                i18n("errors.confirm_resend_email"),
                                React.createElement("a", {
                                    onClick: onResend
                                }, i18n("errors.confirm_resend_here"))
                            )
                        )
                    )
                );
            }
        })
    );
};
