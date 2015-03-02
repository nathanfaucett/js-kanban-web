var React = require("react"),
    map = require("map"),
    isString = require("is_string");


var FormErrors = React.createClass({

    displayName: "FormErrors",

    contextTypes: {
        ctx: React.PropTypes.object
    },

    render: function() {
        var i18n = this.context.ctx.i18n;

        return (
            React.createElement("div", {
                    className: "form-errors"
                },
                map(this.props.errors, function(error) {
                    return (
                        React.createElement("p", {
                            key: isString(error) ? error : error.message,
                            className: "form-error"
                        }, isString(error) ? error : i18n(error.message))
                    );
                })
            )
        );
    }
});


module.exports = FormErrors;
