var page = require("page"),
    i18n = require("i18n"),
    request = require("request"),
    layers = require("layers_browser"),
    dispatcher = require("./dispatcher"),
    RouteConsts = require("./consts/route_consts"),
    UserStore = require("./stores/user_store"),
    config = require("./config");


var app = exports;


app.router = new layers.Router();
app.config = config;
app.page = page;
app.dispatcher = dispatcher;
app.node = null;


require("./routes/index");


app.init = function() {

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    app.node = document.getElementById("app");

    page.on("request", function onRequest(ctx) {
        app.router.handler(ctx, function callback(err, ctx) {
            if (err) {
                dispatcher.handleViewAction({
                    actionType: RouteConsts.APP_ROUTE_ERROR,
                    ctx: ctx,
                    error: err
                });
                throw err;
            } else {
                dispatcher.handleViewAction({
                    actionType: RouteConsts.APP_ROUTE,
                    ctx: ctx
                });
            }
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.flatMode(config.flatLocaleMode);
    i18n.throwMissingError(config.throwMissingTranslationError);
    page.html5Mode(config.html5Mode);

    page.init();
};
