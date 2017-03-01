
var _ = require('lodash'),
    glob = require('glob'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');

/**
 * Validate NODE_ENV existence
 */
var validateEnvironmentVariable = function () {
    var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
    console.log();
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
        }
        process.env.NODE_ENV = 'development';
    }
    console.log(chalk.yellow('_ now NODE_ENV is: '+ process.env.NODE_ENV));
    console.log(chalk.white(''));
};

var initGlobalConfigFiles = function(config, assets) {
    config.files = {
        client: {},
        server: {}
    };

    config.files.client.css = getGlobbedPaths(assets.client.css, ['public/']);
    config.files.client.js = getGlobbedPaths(assets.client.lib.js, ['public/']).concat(getGlobbedPaths(assets.client.js, ['public/']));
    config.files.server.models = getGlobbedPaths(assets.server.models);
    config.files.server.routes = getGlobbedPaths(assets.server.routes);
}

var getGlobbedPaths = function (globPatterns, excludes) {
    // console.log(globPatterns, excludes);
    // console.log('');
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    var output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (var i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
}

var initGlobalConfigFolders = function (config, assets) {
    config.folders = {
        client: {},
        server: {}
    };
    config.folders.client = getGlobbedPaths(path.join(process.cwd(), 'modules/client/'), process.cwd().replace(new RegExp(/\\/g), '/'));
}

var validateSessionSecret = function (config, testing) {
    if(process.env.NODE_ENV !== 'production') {
        return true;
    }

    if(config.sessionSecret === 'MEAN') {
        if(!testing) {
            console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
            console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
            console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
            console.log();
        }
        return false;
    } else {
        return true;
    }
}

var initGlobalConfig = function () {
    validateEnvironmentVariable();

    var defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));
    var environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};
    var assets = _.merge(defaultAssets, environmentAssets);

    var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));
    var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};
    var config = _.merge(defaultConfig, environmentConfig);

    var pkg = require(path.join(process.cwd(), 'package.json'));
    config.meanjs = pkg;

    config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'config/env/local-', process.env.NODE_ENV, '.js')) && require(path.join(process.cwd(), 'config/env/local-', process.env.NODE_ENV, '.js'))) || {});

    initGlobalConfigFiles(config, assets);
    initGlobalConfigFolders(config, assets);
    validateSessionSecret(config);
    
    return config;

}

module.exports = initGlobalConfig();


