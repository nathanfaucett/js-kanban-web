var React = require("react");


var NavItem = React.createClass({

    displayName: "NavItem",

    contextTypes: {
        ctx: React.PropTypes.object
    },

    render: function() {
        var ctx = this.context.ctx;

        return (
            React.createElement("li", {
                    className: "item" + (ctx.pathname === this.props.link ? " active" : "")
                },
                React.createElement("a", {
                    href: this.props.link
                }, ctx.i18n(this.props.name))
            )
        );
    }
});


module.exports = NavItem;
