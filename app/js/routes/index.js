var app = require("../app");


app.router.use(
    require("./middleware/i18n")
);

require("./auth");
require("./projects");
require("./account");

require("./not_found");
