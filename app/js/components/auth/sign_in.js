var React = require("react"),
    trim = require("trim"),
    page = require("page"),
    UserStore = require("../../stores/user_store"),
    dispatcher = require("../../dispatcher"),
    assertError = require("../../utils/assert_error"),
    FormErrors = require("../form_errors");


var SignIn = React.createClass({

    displayName: "SignIn",

    contextTypes: {
        ctx: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            errors: {}
        };
    },

    onSubmit: function(e) {
        var errors = null,
            email, password;

        e.preventDefault();

        email = trim(this.refs.email.getDOMNode().value);
        password = trim(this.refs.password.getDOMNode().value);

        errors = assertError(errors, !email, "email", {
            message: "errors.forms.invalid_email"
        });
        errors = assertError(errors, !password, "password", {
            message: "errors.forms.invalid_password"
        });

        if (errors !== null) {
            this.setState({
                errors: errors
            });
        } else {
            dispatcher.handleViewAction({
                actionType: UserStore.consts.USER_SIGN_IN,
                email: email,
                password: password
            });
        }
    },

    componentDidMount: function() {
        UserStore.on("signIn", this.onSignIn);
    },

    componentWillUnmount: function() {
        UserStore.off("signIn", this.onSignIn);
    },

    onSignIn: function(errors) {
        if (errors) {
            this.setState({
                errors: errors
            });
        } else {
            page.go("/");
        }
    },

    render: function() {
        var i18n = this.context.ctx.i18n,
            errors = this.state.errors;

        return (
            React.createElement("div", {
                    className: "sign in"
                },
                React.createElement("h2", null,
                    i18n("forms.sign_in")
                ),
                React.createElement("p", null,
                    i18n("forms.sign_up_not_member") + " ",
                    React.createElement("a", {
                            href: "/sign_up"
                        },
                        i18n("forms.sign_up")
                    )
                ),
                React.createElement("form", {
                        className: "grid",
                        onSubmit: this.onSubmit
                    },
                    React.createElement(FormErrors, {
                        errors: errors.invalid_credentials
                    }),
                    React.createElement("div", {
                            className: "email"
                        },
                        React.createElement("input", {
                            ref: "email",
                            type: "text",
                            placeholder: i18n("forms.email")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.email
                        })
                    ),
                    React.createElement("div", {
                            className: "password"
                        },
                        React.createElement("input", {
                            ref: "password",
                            type: "password",
                            placeholder: i18n("forms.password")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.password
                        })
                    ),
                    React.createElement("div", {
                            className: "submit"
                        },
                        React.createElement("input", {
                            className: "btn block blue",
                            type: "submit",
                            value: i18n("forms.sign_in")
                        })
                    )
                )
            )
        );
    }
});


module.exports = SignIn;
