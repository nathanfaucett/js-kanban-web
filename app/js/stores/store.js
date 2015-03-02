var dispatcher = require("../dispatcher"),
    EventEmitter = require("event_emitter");


var EVENT_CHANGE = "CHANGE";


function Store() {
    EventEmitter.call(this, -1);

    this.__register = null;
}
EventEmitter.extend(Store);

Store.prototype.emitChange = function() {
    this.emit(EVENT_CHANGE);
};

Store.prototype.addChangeListener = function(callback) {
    this.on(EVENT_CHANGE, callback);
};

Store.prototype.removeChangeListener = function(callback) {
    this.off(EVENT_CHANGE, callback);
};

Store.prototype.register = function(callback) {
    if (this.__register === null) {
        this.__register = dispatcher.register(callback);
    }
    return this;
};

Store.prototype.unregister = function() {
    if (this.__register !== null) {
        dispatcher.unregister(this.__register);
        this.__register = null;
    }
    return this;
};

Store.prototype.id = function() {
    return this.__register;
};


module.exports = Store;
