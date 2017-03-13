'use strict';

angular.module('core')
.controller('AboutController', ['$http', '$scope', '$rootScope', 'utility', 'dataManager',

function ($http, $scope, $rootScope, utility, dataManager) {
    
    if($rootScope.companyinfo) {
        $scope.info = $rootScope.companyinfo;
        $(".about-content").html($scope.info.intro);
    } else {
        dataManager.getCompanyInfo(function (data) {
            $rootScope.companyinfo = data;
            $scope.info = $rootScope.companyinfo;
        });
    }



}

]);
