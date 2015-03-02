module.exports = function inTargetPath(target, element) {
    do {
        if (target === element) {
            return true;
        }
    } while ((target = target.parentNode));
    return false;
};
