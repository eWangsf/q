
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationDependency);

// angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$location',
// function ($rootScope, $location) {


//     $rootScope.go = function (path, pageAnimationClass) {

//         if (typeof(pageAnimationClass) === 'undefined') {
//             $rootScope.pageAnimationClass = 'crossFade';
//         } else {
//             $rootScope.pageAnimationClass = pageAnimationClass;
//         }

//         if (path === 'back') {
//             $window.history.back();
//         } else { 
//             $location.path(path);
//         }
//     };
// }]);
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
    function ($locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

    }
]);



angular.element(document).ready(function () {
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});




