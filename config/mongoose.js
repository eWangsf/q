
var config = require('./config'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    path = require('path');

module.exports.connect = function(_cb) {
    var db = mongoose.connect(config.db.uri);
    if(_cb) _cb(db);
}

module.exports.loadModels = function (_cb) {
  // Globbing model files
    config.files.server.models.forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });

    if (_cb) _cb();

}

module.exports.disconnect = function (_cb) {
    mongoose.disconnect(function(_err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        _cb(_err);
    });
}






