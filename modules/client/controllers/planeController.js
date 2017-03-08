'use strict';

angular.module('core').controller('PlaneController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    $scope.planes = [];

    // $scope.types = [{
    //     type: 4,
    //     label: '所有类型'
    // }, {
    //     type: 3,
    //     label: '运动会'
    // }, {
    //     type: 1,
    //     label: '趣味运动会'
    // }, {
    //     type: 2,
    //     label: '球类比赛'
    // }];
    // $scope.typeitem = $scope.types[0];

    dataManager.getPlaneTypes(function (data) {
        $scope.types = data;
        $scope.typeitem = $scope.types[0];

        $scope.planeFilter();
    })
    
    

    $scope.planeFilter = function () {
        var type = $scope.typeitem.type || "";
        dataManager.getPlanes({type: type}, function (data) {   
            $scope.planes = data;
        });

    }
    



    // var obj = {
    //     imageurl: "images/1.png",
    //     title: 'test_title4',
    //     type: [1],
    //     membernum: 2004
    // };
    // dataManager.addPlanes(obj, function (data) {
    //     $scope.push(obj);
    //     $scope.update();
    // })

}

]);


