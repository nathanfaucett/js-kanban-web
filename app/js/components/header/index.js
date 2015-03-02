var React = require("react"),
    NavItem = require("./nav_item");


var Header = React.createClass({

    displayName: "Header",

    contextTypes: {
        ctx: React.PropTypes.object.isRequired
    },

    render: function() {
        var ctx = this.context.ctx,
            i18n = ctx.i18n;

        return (
            React.createElement("div", {
                    className: "header"
                },
                React.createElement("div", {
                        className: "wrap"
                    },
                    React.createElement("div", {
                            className: "grid"
                        },
                        React.createElement("div", {
                                className: "col-xs-12 col-sm-4"
                            },
                            React.createElement("div", {
                                    className: "logo"
                                },
                                React.createElement("a", {
                                    href: "/"
                                }, React.createElement("h1", null, i18n("app.name")))
                            )
                        ),
                        React.createElement("div", {
                                className: "col-xs-12 col-sm-8"
                            },
                            React.createElement("ul", {
                                    className: "nav"
                                },
                                React.createElement(NavItem, {
                                    link: "/",
                                    name: "nav.header.projects"
                                }),
                                React.createElement(NavItem, {
                                    link: "/account",
                                    name: "nav.header.account"
                                }),
                                React.createElement(NavItem, {
                                    link: "/sign_out",
                                    name: "nav.header.sign_out"
                                })
                            )
                        )
                    )
                )
            )
        );
    }
});


module.exports = Header;
