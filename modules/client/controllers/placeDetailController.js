// 'use strict';

// angular.module('core').controller('PlaceDetailController', ['$scope', '$rootScope', 'dataManager',

// function ($scope, $rootScope, dataManager) {
//     var nameMapping = {
//         'badminton': '羽毛球',
//         'tennis': '网球',
//         'football': '足球',
//         'swimming': '游泳'
//     };
//     var search = location.search.split('?');
//     $scope.id = search.length > 1 ? search[1].split('=')[1] : '';
    

//     dataManager.getPlaceById({id: $scope.id}, function (data) {
//         $scope.placeDetail = data[0];
//         $scope.type = $scope.placeDetail.type;
//         $scope.typeName = nameMapping[$scope.type];
//     });
// }

// ]);