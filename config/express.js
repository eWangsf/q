
var config = require('./config'),
    express = require('express'),
    _ = require('lodash'),
    path = require('path'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    multer = require('multer'); 



module.exports.init = function (_db) {
    var app = express();

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // app.use(upload()); // for parsing multipart/form-data
    


    initLocalVariables(app);
    initViewEngine(app);

    initModulesClientRoutes(app);
    initModulesServerRoutes(app);

    return app;
}

var initLocalVariables = function (app) {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.cssFiles = config.files.client.css;
    app.locals.jsFiles = config.files.client.js;
}

var initViewEngine = function (app) {
    console.log('*****initviewengine*******');
    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');
    app.set('views', './');
}

var initModulesClientRoutes = function (app) {
    app.use('/', express.static(path.resolve('./public')));

    config.folders.client.forEach(function (staticPath) {
        app.use(staticPath, express.static(path.resolve('./' + staticPath)));
    });

}

var initModulesServerRoutes = function (app) {
    config.files.server.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}





