'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    dataManager.getCompanyInfo(function (data) {
        $rootScope.companyinfo = data;
        $scope.companyinfo = $rootScope.companyinfo;
    });
    
    dataManager.getStatics(function (data) {
        $rootScope.statics = data;
    });
    

}

]);