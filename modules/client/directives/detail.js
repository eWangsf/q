'use strict';

angular.module('core')
.directive('detail', ['dataManager', function(dataManager) {
    return {
        restrict: 'E',
        bindToController: {
            item: '='
        },
        controller: 'itemDetailCtrl',
        templateUrl: '/modules/client/views/detail.html',
        // controllerAs: 'ctrl',
        link: function (scope, ele, attr, dataManager) {
            var arr = ['mov', 'mp4'];
            scope.$watch("item", function (data) {
                if(data) {
                    var append = data.video.split(".")[1];
                    if(arr.indexOf(append) < 0) {
                        $('.place .place-img').html("<iframe style='width: 100%; height: 15rem;' src='" + data.video + "' frameborder='0'></iframe>")
                    }
                }
                console.log(data);
            })
        }
    }
}]);
