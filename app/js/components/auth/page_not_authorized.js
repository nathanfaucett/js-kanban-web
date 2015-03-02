var React = require("react"),
    PageMixin = require("../page_mixin"),
    LayoutNoHeader = require("../layouts/layout_no_header");


var PageNotAuthorized = React.createClass({

    displayName: "PageNotAuthorized",

    mixins: [PageMixin],

    render: function() {
        return (
            React.createElement(LayoutNoHeader, null,
                React.createElement("h1", null, this.props.ctx.i18n("errors.not_authorized"))
            )
        );
    }
});


module.exports = PageNotAuthorized;
