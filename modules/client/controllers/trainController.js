'use strict';

angular.module('core').controller('TrainController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    
    if($rootScope.statics) {
        $scope.statistic = $rootScope.statics;
        $scope.digits = ($scope.statistic.trainNum + "").split("");
    } else {
        dataManager.getStatics(function (data) {
            $scope.statistic = data;
            $scope.digits = (data.trainNum + "").split("");
        });
    }

    dataManager.getTrainTypes(function (data) {
        $scope.types = data;
    })
    
}

]);