var extend = require("extend");


var utils = exports;


utils.loadSettings = function(env) {
    return extend({}, require("./settings/default"), require("./settings/" + env));
};

utils.loadPaths = function(env) {
    return extend({}, require("./paths/default"), require("./paths/" + env));
};
