var page = require("page"),
    UserStore = require("../../../stores/user_store");


function isConfirmed(ctx, next) {
    if (UserStore.user.confirmed) {
        next();
    } else {
        page.go("/not_confirmed");
    }
}


module.exports = isConfirmed;
