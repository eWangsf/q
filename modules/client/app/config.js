
var ApplicationConfiguration = (function () {

    var applicationModuleName = 'Liya';
    var applicationDependency = ['ui.router', 'ngAnimate', 'mgcrea.ngStrap'];

    var registerModule = function (moduleName, dependency) {
        angular.module(moduleName, dependency || []);
        angular.module(applicationModuleName).requires.push(moduleName);
    }

    return {
        applicationModuleName: applicationModuleName,
        applicationDependency: applicationDependency,
        registerModule: registerModule
    };

})();




