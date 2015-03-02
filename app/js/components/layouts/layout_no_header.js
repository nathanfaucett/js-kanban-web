var React = require("react");


var LayoutNoHeader = React.createClass({

    displayName: "LayoutNoHeader",

    propTypes: {
        ctx: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        ctx: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            ctx: this.props.ctx
        };
    },

    render: function() {
        return (
            React.createElement("div", {
                    className: "app"
                },
                React.createElement("div", {
                        className: "content"
                    },
                    this.props.render()
                )
            )
        );
    }
});


module.exports = LayoutNoHeader;
