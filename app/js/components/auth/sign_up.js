var React = require("react"),
    trim = require("trim"),
    page = require("page"),
    indexOf = require("index_of"),
    UserStore = require("../../stores/user_store"),
    dispatcher = require("../../dispatcher"),
    app = require("../../app"),
    assertError = require("../../utils/assert_error"),
    FormErrors = require("../form_errors");


var SignUp = React.createClass({

    displayName: "SignUp",

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
            email, password, confirmPassword, firstname, lastname, locale;

        e.preventDefault();

        email = trim(this.refs.email.getDOMNode().value);
        password = trim(this.refs.password.getDOMNode().value);
        confirmPassword = trim(this.refs.confirmPassword.getDOMNode().value);
        firstname = trim(this.refs.firstname.getDOMNode().value);
        lastname = trim(this.refs.lastname.getDOMNode().value);
        locale = trim(this.refs.locale.getDOMNode().value);

        errors = assertError(errors, !email, "email", {
            message: "errors.forms.invalid_email"
        });
        errors = assertError(errors, !password, "password", {
            message: "errors.forms.invalid_password"
        });
        errors = assertError(errors, password !== confirmPassword, "confirmPassword", {
            message: "errors.forms.invalid_confirm_password"
        });
        errors = assertError(errors, !firstname, "firstname", {
            message: "errors.forms.invalid_firstname"
        });
        errors = assertError(errors, locale && indexOf(app.config.locales, locale) === -1, "locale", {
            message: "errors.forms.locale_not_supported"
        });

        if (errors !== null) {
            this.setState({
                errors: errors
            });
        } else {
            dispatcher.handleViewAction({
                actionType: UserStore.consts.USER_SIGN_UP,
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                locale: locale
            });
        }
    },

    componentDidMount: function() {
        UserStore.on("signUp", this.onSignUp);
    },

    componentWillUnmount: function() {
        UserStore.off("signUp", this.onSignUp);
    },

    onSignUp: function(errors) {
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
                    className: "sign up"
                },
                React.createElement("h2", null,
                    i18n("forms.sign_up")
                ),
                React.createElement("p", null,
                    i18n("forms.sign_in_already_member") + " ",
                    React.createElement("a", {
                            href: "/sign_in"
                        },
                        i18n("forms.sign_in")
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
                            className: "confirm-password"
                        },
                        React.createElement("input", {
                            ref: "confirmPassword",
                            type: "password",
                            placeholder: i18n("forms.confirm_password")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.confirmPassword
                        })
                    ),
                    React.createElement("div", {
                            className: "firstname"
                        },
                        React.createElement("input", {
                            ref: "firstname",
                            type: "text",
                            placeholder: i18n("forms.firstname")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.firstname
                        })
                    ),
                    React.createElement("div", {
                            className: "lastname"
                        },
                        React.createElement("input", {
                            ref: "lastname",
                            type: "text",
                            placeholder: i18n("forms.lastname")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.lastname
                        })
                    ),
                    React.createElement("div", {
                            className: "locale"
                        },
                        React.createElement("input", {
                            ref: "locale",
                            type: "text",
                            placeholder: i18n("forms.locale")
                        }),
                        React.createElement(FormErrors, {
                            errors: errors.locale
                        })
                    ),
                    React.createElement("div", {
                            className: "submit"
                        },
                        React.createElement("input", {
                            className: "btn block blue",
                            type: "submit",
                            value: i18n("forms.sign_up")
                        })
                    )
                )
            )
        );
    }
});


module.exports = SignUp;
