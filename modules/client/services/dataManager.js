'use strict';

angular.module('core')
    .factory('dataManager', [
        '$http', '$rootScope', '$window', 'utility',

        function($http, $rootScope, $window, utility) {
            
            var logMe = function(callback, desc) {
                desc = desc || 'API';
                return function(resp) {
                    if (!resp.status || resp.status != 200) console.log(desc + ' call failed: ' +
                        err);
                    else console.log(desc + ' call succeed.');
                    if (callback) callback(resp.data);
                };
            };
            var handleResponse = function(httpRequest, callback) {
                httpRequest
                    .then(function(resp) {
                        if (callback) {
                            if (resp.status !== 200) callback(resp.statusText);
                            else if (resp.data.error) callback(resp.data.msg);
                            else callback(resp);
                        }
                    })
                    .catch(function(err) {
                        if (callback) callback(err);
                    });
            };

            // index 
            var getStatics = function (callback) {
                handleResponse(
                    utility.httpe.get('/api/statistics'),
                    logMe(callback, 'getStatics'));
            }

            var getCarousels = function (callback) {
                handleResponse(
                    utility.httpe.post('/api/carousels'),
                    logMe(callback, 'getCarousels'));
            }
            var getComments = function (callback) {
                handleResponse(
                    utility.httpe.post('/api/comments'),
                    logMe(callback, 'getComments'));
            }
            var getCompanyInfo = function(callback) {
                handleResponse(
                    utility.httpe.post('/api/about'),
                    logMe(callback, 'getCompanyInfo'));
            }

            // plane
            var getPlanes = function (para, callback) {
                handleResponse(
                    utility.httpe.post('/api/plane/planes', para),
                    logMe(callback, 'getPlanes'));
            }
            var addPlanes = function (data, callback) {
                handleResponse(utility.httpe.post('/api/plane/add', data),
                    logMe(callback, 'addPlanes'));
            }
            var getPlaneTypes = function (callback) {
                handleResponse(utility.httpe.post('/api/plane/types'),
                    logMe(callback, 'getPlaneTypes'));
            }

            // operation
            var getOperationByType = function (type, callback) {
                handleResponse(
                    utility.httpe.post('/api/operation/type', type),
                    logMe(callback, 'getOperationByType'))
            }
            var getPlaceById = function (id, callback) {
                handleResponse(
                    utility.httpe.post('/api/operation/detail', id),
                    logMe(callback, 'getPlaceById'));
            }
            var getDetailById = function (id, callback) {
                handleResponse(
                    utility.httpe.post('/api/detail', id),
                    logMe(callback, 'getDetailById'));
            }
            var getOperationTypes = function (callback) {
                handleResponse(utility.httpe.post('/api/operation/types'),
                    logMe(callback, 'getOperationTypes'));
            }

            // train
            var getTrainsByType = function(para, callback) {
                handleResponse(
                    utility.httpe.post('/api/train/trainoftype', para),
                    logMe(callback, 'getTrainsByType'));
            }
            var getTrainTypes = function (callback) {
                handleResponse(utility.httpe.post('/api/train/types'),
                    logMe(callback, 'getTrainTypes'));
            }



            // admin section
            var getHomeData = function(callback) {
                handleResponse(
                    utility.httpe.post('/api/admin/home/data'),
                    logMe(callback, 'getHomeData'));
            }
            var editCarousel = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/carousel/edit', para),
                    logMe(callback, 'editCarousel'));
            }
            var editComment = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/comment/edit', para),
                    logMe(callback, 'editComment'));
            }

            var editPlane = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/plane/edit', para),
                    logMe(callback, 'editPlane'));
            }
            var editPlace = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/place/edit', para),
                    logMe(callback, 'editPlace'));
            }
            var editTrain = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/train/edit', para),
                    logMe(callback, 'editTrain'));
            }

            var editPlaneType = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/plane/type/edit', para),
                    logMe(callback, 'editPlaneType'));
            }

            var editOperationType = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/operation/type/edit', para),
                    logMe(callback, 'editOperationType'));
            }

            var editTrainType = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/train/type/edit', para),
                    logMe(callback, 'editTrainType'));
            }

            var editCompanyInfo = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/company/edit', para),
                    logMe(callback, 'editCompanyInfo'));
            }

            var deleteFriend = function (obj, action, callback) {
                var para = {
                    data: obj,
                    action: action
                };
                handleResponse(
                    utility.httpe.post('/api/admin/company/friend', para),
                    logMe(callback, 'deleteFriend'));
            }


            var test = function () {

            }
          


            // Public API
            return {
                // home
                'getStatics': getStatics,
                'getCarousels': getCarousels,
                'getComments': getComments,
                // planes
                'getPlanes': getPlanes,
                'addPlanes': addPlanes,
                'getPlaneTypes': getPlaneTypes,
                // operations
                'getOperationByType': getOperationByType,
                'getPlaceById': getPlaceById,
                'getOperationTypes': getOperationTypes,
                // train
                'getTrainsByType': getTrainsByType,
                'getTrainTypes': getTrainTypes,
                // data help
                'getDetailById': getDetailById,

                // admin section
                'getHomeData': getHomeData,
                'editCarousel': editCarousel,
                'editComment': editComment,
                'editPlane': editPlane,
                'editPlace': editPlace,
                'editTrain': editTrain,
                'getCompanyInfo': getCompanyInfo,
                'editPlaneType': editPlaneType,
                'editOperationType': editOperationType,
                'editTrainType': editTrainType,
                'editCompanyInfo': editCompanyInfo,
                'deleteFriend': deleteFriend,
                // 'editTrain': editTrain,
                'test': test
            };
        }
    ]);
