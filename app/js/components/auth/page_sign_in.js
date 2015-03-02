var React = require("react"),
    PageMixin = require("../page_mixin"),
    LayoutNoHeader = require("../layouts/layout_no_header"),
    SignIn = require("./sign_in");


var PageSignIn = React.createClass({

    displayName: "PageSignIn",

    mixins: [PageMixin],

    render: function() {
        return (
            React.createElement(LayoutNoHeader, null,
                React.createElement(SignIn, null)
            )
        );
    }
});


module.exports = PageSignIn;
