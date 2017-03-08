
var config = require('./config'),
    mongoose = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk');


module.exports.init = function (_callback) {
    console.log('Connecting mongodb...');
    mongoose.loadModels();
    mongoose.connect(function (db) {
        console.log('Connected.');
        var app = express.init(db);

        if(_callback) _callback(app, db, config);
    });
}

module.exports.start = function (callback) {
    this.init(function (app, db, config) {

        app.listen(config.port, function () {
            var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
            // Logging initialization
            console.log('--');
            console.log(chalk.green(config.app.title));
            console.log(chalk.green('root:            ' + process.cwd()));
            console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
            console.log(chalk.green('Server:          ' + server));
            console.log(chalk.green('Database:        ' + config.db.uri));
            console.log(chalk.green('App version:     ' + config.meanjs.version));
            if (config.meanjs['meanjs-version'])
                console.log(chalk.green('MEAN.JS version: ' + config.meanjs['meanjs-version']));
            console.log('--');
            // console.log(config);
            console.log('--');

            if (callback) callback(app, db, config);
        });


    });

};








