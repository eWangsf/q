'use strict';

angular.module('core').controller('footerController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    
     // $scope.companyinfo = $rootScope.companyinfo;
    dataManager.getCompanyInfo(function (data) {
        $rootScope.companyinfo = data;
        $scope.companyinfo = $rootScope.companyinfo;
    });

}

]);