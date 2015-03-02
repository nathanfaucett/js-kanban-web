var React = require("react");


var LayoutNoHeader = React.createClass({

    displayName: "LayoutNoHeader",

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


module.exports = LayoutNoHeader;
