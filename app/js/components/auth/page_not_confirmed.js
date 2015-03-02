var React = require("react"),
    PageMixin = require("../page_mixin"),
    LayoutNoHeader = require("../layouts/layout_no_header"),
    UserStore = require("../../stores/user_store"),
    dispatcher = require("../../dispatcher");


var PageNotConfirmed = React.createClass({

    displayName: "PageNotConfirmed",

    mixins: [PageMixin],

    onResend: function() {
        dispatcher.handleViewAction({
            actionType: UserStore.consts.USER_RESEND_CONFIRMATION,
            email: UserStore.user.email
        });
    },

    render: function() {
        var i18n = this.props.ctx.i18n;
        return (
            React.createElement(LayoutNoHeader, null,
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
                            onClick: this.onResend
                        }, i18n("errors.confirm_resend_here"))
                    )
                )
            )
        );
    }
});


module.exports = PageNotConfirmed;
