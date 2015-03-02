var React = require("react"),
    map = require("map"),
    ProjectListItem = require("./list_item"),
    dispatcher = require("../../../dispatcher"),
    ProjectStore = require("../../../stores/project_store");


var ProjectList = React.createClass({

    displayName: "ProjectList",

    contextTypes: {
        ctx: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            list: []
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

        ProjectStore.all(function(err, projects) {
            if (err) {
                throw err; // handle error
            } else {
                _this.setState({
                    list: projects
                });
            }
        });
    },

    onDestroy: function(id) {
        dispatcher.handleViewAction({
            actionType: ProjectStore.consts.PROJECT_DELETE,
            id: id
        });
    },

    render: function() {
        var onDestroy = this.onDestroy;

        return (
            React.createElement("div", {
                    className: "project-list"
                },
                map(this.state.list, function(project) {
                    return (
                        React.createElement(ProjectListItem, {
                            id: project.id,
                            key: project.id,
                            name: project.name,
                            onDestroy: function() {
                                onDestroy(project.id);
                            }
                        })
                    );
                })
            )
        );
    }
});


module.exports = ProjectList;
