var app = require("../../app");


require("./sign_in");
require("./sign_up");
require("./one_time");
require("./not_authorized");

app.router.use(
    require("./middleware/auth"),
    require("./middleware/auto_token_sign_in")
);

require("./confirm_account");
require("./not_confirmed");

app.router.use(
    require("./middleware/is_confirmed")
);

require("./sign_out");
