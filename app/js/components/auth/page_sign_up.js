var React = require("react"),
    PageMixin = require("../page_mixin"),
    LayoutNoHeader = require("../layouts/layout_no_header"),
    SignUp = require("./sign_up");


var PageSignUp = React.createClass({

    displayName: "PageSignUp",

    mixins: [PageMixin],

    render: function() {
        return (
            React.createElement(LayoutNoHeader, null,
                React.createElement(SignUp, null)
            )
        );
    }
});


module.exports = PageSignUp;
