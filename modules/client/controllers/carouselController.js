'use strict';

angular.module('core')
.controller('CarouselController', [ '$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    $scope.carousels = [];

    dataManager.getCarousels(function (data) {
        console.log('getCarousels - carouselController.js');
        $scope.carousels = data;
    });
    
    
}

]);
