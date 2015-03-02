var React = require("react");


module.exports = {
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
    }
};
