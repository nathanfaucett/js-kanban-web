var React = require("react");


var LayoutApp = React.createClass({

    displayName: "LayoutApp",

    render: function() {
        return (
            React.createElement("div", {
                    className: "app"
                },
                React.createElement("div", {
                        className: "content"
                    },
                    this.props.children
                )
            )
        );
    }
});


module.exports = LayoutApp;
