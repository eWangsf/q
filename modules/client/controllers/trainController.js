'use strict';

angular.module('core').controller('TrainController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    dataManager.getTrainTypes(function (data) {
        $scope.types = data;
    })
    
}

]);