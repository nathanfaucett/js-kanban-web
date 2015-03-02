var //request = require("request"),
    values = require("values"),
    //config = require("../config"),
    ProjectConsts = require("../consts/project_consts"),
    Store = require("./store");


var ProjectStore = new Store();


ProjectStore.consts = ProjectConsts;


var _projects = {
        1: {
            id: 1,
            name: "New Project"
        }
    },
    _id = 1;


function create(name, callback) {
    var id = ++_id,
        project = {
            id: id,
            name: name
        };

    _projects[id] = project;
    callback(undefined, project);
}

function update(id, name, callback) {
    var project = _projects[id];

    project.name = name;
    callback(undefined, project);
}

function destroy(id, callback) {
    var project = _projects[id];

    delete _projects[id];
    callback(undefined, project);
}

ProjectStore.all = function(callback) {
    callback(undefined, values(_projects));
};

ProjectStore.show = function(id, callback) {
    var project = _projects[id],
        err = project ? undefined : new Error("Not Found");
    callback(err, project);
};

ProjectStore.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {

        case ProjectConsts.PROJECT_CREATE:
            create(action.name, function(err) {
                if (err) {
                    throw err; // report error
                } else {
                    ProjectStore.emitChange();
                }
            });
            break;

        case ProjectConsts.PROJECT_UPDATE:
            update(action.id, action.name, function(err) {
                if (err) {
                    throw err; // report error
                } else {
                    ProjectStore.emitChange();
                }
            });
            break;

        case ProjectConsts.PROJECT_DELETE:
            destroy(action.id, function(err) {
                if (err) {
                    throw err; // report error
                } else {
                    ProjectStore.emitChange();
                }
            });
            break;
    }
});


module.exports = ProjectStore;
