var React = require("react"),
    Header = require("../header");


var LayoutApp = React.createClass({

    displayName: "LayoutApp",

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
                React.createElement(Header, null),
                React.createElement("div", {
                        className: "content"
                    },
                    this.props.render()
                )
            )
        );
    }
});


module.exports = LayoutApp;
