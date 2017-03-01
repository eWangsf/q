'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    // console.log($stateProvider, $urlRouterProvider);
    // $urlRouterProvider.otherwise('/');
    // $urlRouterProvider.when("", "/");

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/client/views/index.html'
    })
    
    .state('plane', {
        url: '/plane',
        templateUrl: 'modules/client/views/plane.html'
    })
    .state('operation', {
        url: '/operation',
        templateUrl: 'modules/client/views/operation.html'
    })
    .state('train', {
        url: '/train',
        templateUrl: 'modules/client/views/train.html'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'modules/client/views/about.html'
    })
    .state('place', {
        url: '/operation/place',
        templateUrl: 'modules/client/views/operation/place.html'
    })
    .state('operation-detail', {
        url: '/operation/detail',
        templateUrl: 'modules/client/views/operation/placeDetail.html'
    })
    .state('plane-detail', {
        url: '/plane/detail',
        templateUrl: 'modules/client/views/plane/planeDetail.html'
    })
    .state('train-detail', {
        url: '/train/detail',
        templateUrl: 'modules/client/views/train/trainDetail.html'
    })
    .state('train-item', {
        url: '/train/train',
        templateUrl: 'modules/client/views/train/train.html'
    })

    // admin
    .state('admin-home', {
        url: '/admin',
        templateUrl: 'modules/client/views/admin.html'
    })


}]);


