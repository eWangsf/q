'use strict';

angular.module('core').controller('OperationPController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    $scope.places = [];
    dataManager.getOperationByType({type:'badminton'},function (data) {
        $scope.places = data;
    });
}

]);