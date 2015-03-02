var React = require("react");


var ProjectListItem = React.createClass({

    displayName: "ProjectListItem",

    contextTypes: {
        ctx: React.PropTypes.object
    },

    render: function() {
        return (
            React.createElement("div", {
                    className: "project-list-item"
                },
                React.createElement("p", null,
                    React.createElement("a", {
                        href: "/projects/" + this.props.id
                    }, this.props.name)
                ),
                React.createElement("a", {
                        className: "destroy",
                        onClick: this.props.onDestroy
                    },
                    React.createElement("i", null, "x")
                )
            )
        );
    }
});


module.exports = ProjectListItem;
