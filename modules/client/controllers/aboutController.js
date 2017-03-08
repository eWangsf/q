'use strict';

angular.module('core')
.controller('AboutController', ['$http', '$scope', '$rootScope', 'utility', 'dataManager',

function ($http, $scope, $rootScope, utility, dataManager) {
    
    dataManager.getCompanyInfo(function (data) {
        $scope.info = data;

    });

    
}

]);
