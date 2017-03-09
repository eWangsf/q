'use strict';

angular.module('core')
.controller('adminHomeController', [ '$scope', '$rootScope', 'dataManager',

function ($scope, $rootScope, dataManager) {

    dataManager.getHomeData(function (data) {
        $scope.data = data;
        $("#companyInfoForm .note-editable").html(data.companyinfo.intro);
    });

    $("form").submit(function() {
        $(this).find('#intro').html($(this).find(".note-editable").html());
        $(this).find('.note-frame input').remove();
    });
    $('[name="intro"]').summernote({
        callbacks: {
            onImageUpload: function (files) {
                var files = $(files);
                var target = $(this);
                files.each(function() {
                    
                    var file = this;
                    var data = new FormData();
                    data.append("append", file);
                    $.ajax({
                        data : data,
                        type : "POST",
                        url : "/upload",
                        cache : false,
                        contentType : false,
                        processData : false,
                        success : function(response) {
                            var data = response.append;
                            if(data.length == 0) {
                                return ;
                            }
                            data[0].path = data[0].path.replace(/public/, "");
                            $(target).summernote('insertImage', data[0].path);
                        },
                        error : function (err) {
                            alert("图片上传失败，请稍后重试");
                        }
                    });
                });
                // $('#planeModel_add form').append();
            }
        }
    });
    document.getElementById('resultIframe').onload = function () {
        var html = document.getElementById('resultIframe').contentWindow.document.body.innerText;
        if ((/Error/i).test(html)) {
            return ;
        }
        var json = JSON.parse(html);
        if(json.code == 200) {
            window.location.reload();
        } else {
            alert(json.errmsg || "操作失败，请刷新后重试");
        }
    }

    $scope.toTop = function () {
        window.scrollTo(0, 0);
    }

    $scope.modCarouselBtn = function (carousel) {
        $scope.now_carousel = carousel;
        $('#carouselModel').modal();
    }
    $scope.modCarouselSubmit = function () {
        $('#carouselModel form').submit();
        // var obj = $scope.now_carousel;
        // obj.imageurl = $('#carouselModel #imageurl').val();
        // obj.name = $('#carouselModel #name').val();

        // dataManager.editCarousel(obj, "modify", function (data) {
        //     $('#carouselModel').modal('hide');
        // });
    }
    $scope.delCarouselBtn = function (carousel) {
        dataManager.editCarousel(carousel, "delete", function (data) {
            $('#carouselModel').modal('hide');
        });
    }

    $scope.addCommentBtn = function () {
        $('#commentModel_add').modal('show');
    }
    $scope.addCommentSubmit = function () {
        $('#commentModel_add form').submit();
        // var obj = {};
        // obj.avatar = $('#commentModel_add #avatar').val();
        // obj.name = $('#commentModel_add #name').val();
        // obj.job = $('#commentModel_add #job').val();
        // obj.content = $('#commentModel_add #content').val();

        // dataManager.editComment(obj, "add", function (data) {
        //     $('#commentModel_add').modal('hide');
        // })
    }
    $scope.modCommentBtn = function (comment) {
        $scope.now_comment = comment;
        $('#commentModel').modal();
    }
    $scope.modCommentSubmit = function () {
        $('#commentModel form').submit();
        // var obj = $scope.now_comment;
        // obj.avatar = $('#commentModel #avatar').val();
        // obj.name = $('#commentModel #name').val();
        // obj.job = $('#commentModel #job').val();
        // obj.content = $('#commentModel #content').val();

        // dataManager.editComment(obj, "modify", function (data) {
        //     $('#commentModel').modal('hide');
        // });
    }
    $scope.delCommentBtn = function (comment) {
        dataManager.editComment(comment, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    // $scope.sendFile = function (file, callback) {
    //     var data = new FormData();
    //     data.append("append", file);
    //     $.post('/upload', {
    //         data: data
    //     }, function (data) {
    //         callback(data);
    //     });
    // }

    $scope.addPlane = function () {
        $('#planeModel_add').modal('show');
        $('#planeModel_add #type').change(function () {
            $('#planeModel_add #typename').val($('#planeModel_add #type option:selected').text());
        });
        // $('#planeModel_add #intro').summernote();
    
    }
    $scope.addPlaneSubmit = function () {
        $('#planeModel_add form').submit();
        // var obj = {
        //     imageurl: $('#planeModel_add #imageurl').val(),
        //     title: $('#planeModel_add #title').val(),
        //     membernum: $('#planeModel_add #membernum').val(),
        //     intro: $('#planeModel_add #intro').val(),
        //     video: $('#planeModel_add #video').val(),
        //     type: $('#planeModel_add #type').val()
        // };
        // obj.pre = [{
        //     "label": "活动策划",
        //     "url": "/plane"
        // }, {
        //     "label": $('#planeModel_add #type option:selected').text(),
        //     "url": "/plane?type=" + obj.type
        // }];
        // dataManager.editPlane(obj, "add", function (data) {
        //     window.location.href = "/admin";
        // })
    }
    $scope.modPlaneBtn = function (plane) {
        $scope.now_plane = plane;
        $('#planeModel').modal();
        $('#planeModel #type').change(function () {
            $('#planeModel #typename').val($('#planeModel #type option:selected').text());
        });
        $('#planeModel .note-editable').html(plane.intro || "暂无介绍");
        // $('#planeModel #intro').summernote();
    }
    $scope.modPlaneSubmit = function () {
        $('#planeModel form').submit();
        // var obj = $scope.now_plane;
        // obj.imageurl = $('#planeModel #imageurl').val();
        // obj.title = $('#planeModel #title').val();
        // obj.membernum = $('#planeModel #membernum').val();
        // obj.intro = $('#planeModel #intro').val();
        // obj.video = $('#planeModel #video').val();
        // obj.type = $('#planeModel #type').val();
        // obj.pre = [{
        //     "label": "活动策划",
        //     "url": "/plane"
        // }, {
        //     "label": $('#planeModel #type option:selected').text(),
        //     "url": "/plane?type=" + obj.type
        // }];
        // if(obj.type == "3") {
        //     obj.type = [1, 2];
        // }
        // dataManager.editPlane(obj, "modify", function (data) {
        //     window.location.reload();
        // });
    }
    $scope.delPlaneBtn = function (plane) {
        dataManager.editPlane(plane, "delete", function (data) {
            window.location.reload();
        });
    }

    $scope.addPlace = function () {
        $('#placeModel_add').modal('show');
        $('#placeModel_add #type').change(function () {
            $('#placeModel_add #typename').val($('#placeModel_add #type option:selected').text());
        });
        // $('#placeModel_add #intro').summernote();
    }
    $scope.addPlaceSubmit = function () {
        $('#placeModel_add form').submit();
        // var obj = {
        //     imageurl: $('#placeModel_add #imageurl').val(),
        //     title: $('#placeModel_add #title').val(),
        //     addr: $('#placeModel_add #addr').val(),
        //     tele: $('#placeModel_add #tele').val(),
        //     intro: $('#placeModel_add #intro').val(),
        //     video: $('#placeModel_add #video').val(),
        //     type: $('#placeModel_add #type').val(),
        //     pre: [{
        //         url: "/operation", 
        //         label: "场馆运营"
        //     }, {
        //         url: "/operation/place?type=" + $('#placeModel_add #type').val(), 
        //         label: $('#placeModel_add #type option:selected').text()
        //     }]
        // };
        // dataManager.editPlace(obj, "add", function (data) {
        //     window.location.href = "/admin";
        // });
    }
    $scope.modPlaceBtn = function (place) {
        $scope.now_place = place;
        $('#placeModel').modal();
        $('#placeModel .note-editable').html(place.intro || "暂无介绍");
        // $('#placeModel #intro').summernote();
    }
    $scope.modPlaceSubmit = function () {
        $('#placeModel form').submit();
        // var obj = $scope.now_place;
        // obj.imageurl = $('#placeModel #imageurl').val();
        // obj.title = $('#placeModel #title').val();
        // obj.addr = $('#placeModel #addr').val();
        // obj.tele = $('#placeModel #tele').val();
        // obj.intro = $('#placeModel #intro').val();
        // obj.video = $('#placeModel #video').val();
        // dataManager.editPlace(obj, "modify", function (data) {
        //     window.location.href = "/admin";
        // });
    }
    $scope.delPlaceBtn = function (place) {
        dataManager.editPlace(place, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    $scope.addTrain = function () {
        $('#trainModel_add').modal('show'); 
        $('#trainModel_add #type').change(function () {
            $('#trainModel_add #typename').val($('#trainModel_add #type option:selected').text());
        });
        // $('#trainModel_add #intro').summernote();
    }
    $scope.addTrainSubmit = function () {
        $('#trainModel_add form').submit();
        // var obj = {
        //     imageurl: $('#trainModel_add #imageurl').val(),
        //     title: $('#trainModel_add #title').val(),
        //     addr: $('#trainModel_add #addr').val(),
        //     tele: $('#trainModel_add #tele').val(),
        //     intro: $('#trainModel_add #intro').val(),
        //     video: $('#trainModel_add #video').val(),
        //     type: $('#trainModel_add #type').val(),
        //     pre: [{
        //         url: "/train", 
        //         label: "体育培训"
        //     }, {
        //         url: "/train/train?type=" + $('#trainModel_add #type').val(), 
        //         label: $('#trainModel_add #type option:selected').text()
        //     }]
        // };
        // dataManager.editTrain(obj, "add", function (data) {
        //     window.location.reload();
        // });
    }
    $scope.modTrainBtn = function (train) {
        $scope.now_train = train;
        $('#trainModel').modal();
        $('#trainModel .note-editable').html(train.intro || "暂无介绍");

        // $('#trainModel #intro').summernote();
    }
    $scope.modTrainSubmit = function () {
        $('#trainModel form').submit();
        // var obj = $scope.now_train;
        // obj.imageurl = $('#trainModel #imageurl').val();
        // obj.title = $('#trainModel #title').val();
        // obj.addr = $('#trainModel #addr').val();
        // obj.tele = $('#trainModel #tele').val();
        // obj.intro = $('#trainModel #intro').val();
        // obj.video = $('#trainModel #video').val();
        // dataManager.editTrain(obj, "modify", function (data) {
        //     window.location.reload();
        // });
    }
    $scope.delTrainBtn = function (train) {
        dataManager.editTrain(train, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    $scope.addPlaneType = function () {
        $('#planeTypeModel_add').modal('show');
    }
    $scope.addPlaneTypesSubmit = function () {
        var obj = {
            name: $('#planeTypeModel_add #name').val(),
            type: $('#planeTypeModel_add #type').val()
        }

        dataManager.editPlaneType(obj, 'add', function (data) {
            window.location.href = "/admin";
        });
    }
    $scope.deletePlaneType = function (planetype) {
        dataManager.editPlaneType(planetype, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    $scope.addOperationType = function () {
        $('#opTypeModel_add').modal('show');
    }
    $scope.addOperationTypesSubmit = function () {
        var obj = {
            name: $('#opTypeModel_add #name').val(),
            type: $('#opTypeModel_add #type').val()
        }

        dataManager.editOperationType(obj, 'add', function (data) {
            window.location.href = "/admin";
        })
    }
    $scope.deleteOperationType = function (optype) {
        dataManager.editOperationType(optype, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    $scope.addTrainType = function () {
        $('#trainTypeModel_add').modal('show');
    }
    $scope.addTrainTypesSubmit = function () {
        var obj = {
            name: $('#trainTypeModel_add #name').val(),
            type: $('#trainTypeModel_add #type').val()
        }

        dataManager.editTrainType(obj, 'add', function (data) {
            window.location.href = "/admin";
        });
    }
    $scope.deleteTrainType = function (traintype) {
        dataManager.editTrainType(traintype, "delete", function (data) {
            window.location.href = "/admin";
        });
    }

    $scope.modCompanyInfoSubmit = function () {
        var obj = $scope.data.companyinfo;

        obj.logo = $('#companyInfoForm #logo').val();
        obj.aboutusImg = $('#companyInfoForm #aboutusImg').val();
        obj.intro = $('#companyInfoForm #intro').val();
        obj.mail = $('#companyInfoForm #mail').val();
        obj.phone = $('#companyInfoForm #phone').val();
        obj.wechat = $('#companyInfoForm #wechat').val();        

        dataManager.editCompanyInfo(obj, 'modify', function (data) {
            window.location.href = "/admin";
        })
    }

    $scope.addFriend = function () {
        if($('.friendlogo').val() == 0) {
            alert("您还未上传文件");
            return;
        }
        $('#addFriendBtn').before('<input type="file" name="friendlogo" class="friendlogo" />');
        return false;

    }
    
    
}

]);
