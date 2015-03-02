var React = require("react"),
    PageMixin = require("./page_mixin"),
    LayoutApp = require("./layouts/layout_app");


var PageNotFound = React.createClass({

    displayName: "PageNotFound",

    mixins: [PageMixin],

    render: function() {
        return (
            React.createElement(LayoutApp, null,
                React.createElement("h1", null, this.props.ctx.i18n("errors.not_found"))
            )
        );
    }
});


module.exports = PageNotFound;
