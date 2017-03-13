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
            
            scope.$watch("item", function (data) {
                console.log(data);
            })
        }
    }
}]);
