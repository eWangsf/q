'use strict';

angular.module('core').controller('operationController', ['$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {
    // $scope.planes = [];

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
    if($rootScope.statics) {
        $scope.statistic = $rootScope.statics;
        $scope.digits = ($scope.statistic.operationNum + "").split("");
    } else {
        dataManager.getStatics(function (data) {
            $scope.statistic = data;
            $scope.digits = (data.operationNum + "").split("");
        });
    }
    // dataManager.getStatics(function (data) {
    //     $scope.statistic = data;
    //     $scope.digits = (data.operationNum + "").split("");
    // });

    dataManager.getOperationTypes(function (data) {
        $scope.types = data;
    })
    
    

    // $scope.planeFilter = function () {
    //     var type = $scope.typeitem.type || "";
    //     // var arr = [type];
    //     // if(type == 3) {
    //     //     arr = [1, 2];
    //     // }
    //     dataManager.getPlanes({type: type}, function (data) {
            
    //         $scope.planes = data;
    //     });

    // }
    



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


