'use strict';

angular.module('core').controller('TrainByKindController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    var nameMapping = {
        'badminton': '羽毛球',
        'tennis': '网球',
        'football': '足球',
        'swimming': '游泳',
        'basketball': '篮球',
        'score': '中考体育'
    };
    var search = location.search.split('?');
    $scope.type = search.length > 1 ? search[1].split('=')[1] : 'badminton';
    $scope.typeName = nameMapping[$scope.type];

    dataManager.getTrainsByType({type: $scope.type}, function (data) {
        $scope.trains = data;
    });
}

]);




