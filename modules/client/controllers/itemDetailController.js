'use strict';

angular.module('core')
.controller('itemDetailCtrl', [ '$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    var search = location.search.split('?');
    $scope.id = search.length > 1 ? search[1].split('=')[1] : '';
    
    dataManager.getDetailById({id: $scope.id}, function (result) {
        $scope.item = result.data;
        $('.place .place-desc').html($scope.item.intro)
    });
    // $scope.item = {
    //     "_id": "58849e954522ff1949f0fd61",
    //     "imageurl": "/images/erweima.jpg",
    //     "title": "海润羽毛球馆2",
    //     "tele": "0571-21111111",
    //     "addr": "深圳-南山区 南海大道1105号海润羽毛球馆_2",
    //     "intro": "海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_2_badminton",
    //     "video":"/images/1.mov",
    //     "type":
    //     "badminton",
    //     "__v":0
    // };
    
}

]);
