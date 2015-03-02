module.exports = function(errors, bool, key, error) {
    var errorArray;

    if (bool) {
        errors = errors || {};
        errorArray = errors[key] || (errors[key] = []);
        errorArray[errorArray.length] = error;
    }

    return errors;
};
