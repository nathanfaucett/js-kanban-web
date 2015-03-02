var React = require("react"),
    page = require("page"),
    ProjectStore = require("../../../stores/project_store");


var Project = React.createClass({

    displayName: "Project",

    contextTypes: {
        ctx: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            project: {}
        };
    },

    componentDidMount: function() {
        ProjectStore.addChangeListener(this.onChange);
        this.onChange();
    },

    componentWillUnmount: function() {
        ProjectStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        var _this = this;

        ProjectStore.show(this.context.ctx.params.id, function(err, project) {
            if (err) {
                page.go("/not_found");
            } else {
                _this.setState({
                    project: project
                });
            }
        });
    },

    render: function() {
        return (
            React.createElement("div", {
                    className: "project"
                },
                JSON.stringify(this.state.project)
            )
        );
    }
});


module.exports = Project;
