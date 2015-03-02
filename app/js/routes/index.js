var app = require("../app");


app.router.use(
    require("./middleware/i18n")
);

require("./auth/index");

require("./not_found");
