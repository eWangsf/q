'use strict';

angular.module('core').controller('footerController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    
    dataManager.getCompanyInfo(function (data) {
        $rootScope.companyinfo = data;
        $scope.companyinfo = $rootScope.companyinfo;
    });

}

]);