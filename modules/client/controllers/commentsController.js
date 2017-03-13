'use strict';

angular.module('core')
.controller('CommentsController', ['$http', '$scope', '$rootScope', 'utility', 'dataManager',

function ($http, $scope, $rootScope, utility, dataManager) {
    
    $scope.comments = [];
    $scope.commentArr = [];
    dataManager.getComments(function (data) {
        console.log('getComments - commentsController.js');
        $scope.comments = data;
        for(var i = 0; i < Math.ceil(data.length / 3); i++) {
            $scope.commentArr.push(i);
        }

    });
    $scope.style = {
        "left": "0"
    };
    $scope.cindex = 0;

    $scope.toggleComment = function (index) {
        $scope.style = {
            "left": (-100 * index) + "vw"
        };
        $scope.cindex = index;
    }

    
}

]);
