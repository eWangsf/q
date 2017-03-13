'use strict';

angular.module('core').factory('utility', ['$rootScope', '$http', '$q',

function($rootScope, $http, $q) {
    var exports = {},
        requestTable = {};

    exports.httpe = function (options) {
        if (options.url in requestTable)
            requestTable[options.url].resolve();
        requestTable[options.url] = $q.defer();
        options.timeout = requestTable[options.url].promise;
        return $http(options);
    };

    exports.httpe.get = function (url, options) {
        options = options || {};
        options.url = url;
        options.method = 'GET';
        return exports.httpe(options);
    };

    exports.httpe.post = function (url, data, options) {
        options = options || {};
        options.url = url;
        options.data = data;
        options.method = 'POST';
        return exports.httpe(options);
    };

    exports.resolver = function (deferred) {
        return function (err, result) {
            if (err) deferred.reject(err);
            else deferred.resolve(result);
        };
    };

    

    return exports;
}

]);
