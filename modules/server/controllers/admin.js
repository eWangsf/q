
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/config"),
    models = require("../models/model"),
    q = require('q');

exports.getHomeData = function (req, res) {
    var data = {};
    var _carousel = models.Carousels,
        _comment = models.Comments,
        _companyInfo = models.companyInfos;
    var promise1 = _carousel
        .find()
        .exec();
    var promise2 = _comment
        .find()
        .exec();
    var promise3 = _companyInfo
        .find()
        .exec();
    var promise4 = models.plane
        .find()
        .exec();
    var promise5 = models.operationplaces
        .find()
        .exec();
    var promise6 = models.trains
        .find()
        .exec();
    var promise7 = models.planetypes
        .find()
        .exec();
    var promise8 = models.operationtypes
        .find()
        .exec();
    var promise9 = models.traintypes
        .find()
        .exec();
    var promise10 = models.statistic
        .find()
        .exec();

    q.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9, promise10])
        .then(function (dbdata) {
            data.carousels = dbdata[0];
            data.comments = dbdata[1]; 
            data.companyinfo = dbdata[2][0]; 
            data.planes = dbdata[3]; 
            data.places = dbdata[4]; 
            data.trains = dbdata[5]; 
            data.planetypes = dbdata[6]; 
            data.operationtypes = dbdata[7]; 
            data.traintypes = dbdata[8]; 
            data.statistic = dbdata[9][0]; 
            res.json(data);           
        }); 
}

exports.editCarousel = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    var _carousel = models.Carousels;

    if(action != "delete") {
        var imageurl = (files.imageurl && files.imageurl.length > 0 && files.imageurl[0].filename.length > 0) ? ('/images/uploads/' + files.imageurl[0].filename) : (obj.imageurl_url);
    }
    switch(action) {
        case "modify": {
            _carousel
                .update({_id: obj._id}, {$set: {
                    imageurl: imageurl,
                    name: obj.name,
                    active: obj.active
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
        case "delete": {
            _carousel
                .remove({_id: obj.data._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }
}

exports.editComment = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    var _comment = models.Comments;

    if(action != "delete") {
        var avatar = (files.avatar && files.avatar.length > 0 && files.avatar[0].filename.length > 0) ? ('/images/uploads/' + files.avatar[0].filename) : (obj.avatar_url);
    }
    switch(action) {
        case "add": {
            var _item = new _comment({
                avatar: avatar,
                name: obj.name,
                job: obj.job,
                content: obj.content
            });
            _item.save()
                .then(function (data, num) {
                    handleDB(req, res, "add", num);
                    console.log('save comment data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save comment data err: ---', err);
                });
            break;
        }
        case "modify": {
            _comment
                .update({_id: obj._id}, {$set: {
                    avatar: avatar,
                    name: obj.name,
                    job: obj.job,
                    content: obj.content
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
        case "delete": {
            _comment
                .remove({_id: obj.data._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }
}

exports.editPlane = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    var _plane = models.plane;
    if(action != 'delete') {
        var imageurl = (files.imageurl && files.imageurl.length > 0 && files.imageurl[0].filename.length > 0) ? ('/images/uploads/' + files.imageurl[0].filename) : (obj.imageurl_url),
            video = (files.video && files.video.length > 0 && files.video[0].filename.length > 0) ? ('/images/uploads/' + files.video[0].filename) : (obj.video_url);
    }

    switch(action) {
        case "add": {
            var _item = new _plane({
                imageurl: imageurl,
                title: obj.title,
                membernum: obj.membernum, 
                intro: obj.intro,
                video: video,
                type: parseInt(obj.type),
                pre: [{
                    "label": "活动策划",
                    "url": "/plane"
                }, {
                    "label": obj.typename,
                    "url": "/plane?type=" + parseInt(obj.type)
                }]
            });

            _item.save()
                .then(function (data, num) {
                    // res.json({
                    //     data: data,
                    //     num: num
                    // })
                    handleDB(req, res, "add", num);
                    console.log('save plane data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save plane data err: ---', err);
                });
            break;
        }
        case "modify": {
            _plane
                .update({_id: obj._id}, {$set: {
                    imageurl: imageurl,
                    title: obj.title,
                    membernum: obj.membernum, 
                    intro: obj.intro,
                    video: video,
                    type: parseInt(obj.type),
                    pre: [{
                        "label": "活动策划",
                        "url": "/plane"
                    }, {
                        "label": obj.typename,
                        "url": "/plane?type=" + parseInt(obj.type)
                    }]
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
        case "delete": {
            _plane
                .remove({_id: obj.data._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
}

exports.editPlace = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    var _model = models.operationplaces;

    if(action != 'delete') {
        var imageurl = (files.imageurl && files.imageurl.length > 0 && files.imageurl[0].filename.length > 0) ? ('/images/uploads/' + files.imageurl[0].filename) : (obj.imageurl_url),
            video = (files.video && files.video.length > 0 && files.video[0].filename.length > 0) ? ('/images/uploads/' + files.video[0].filename) : (obj.video_url);
    }

    switch(action) {
        case "add": {
            var _item = new _model({
                    imageurl: imageurl,
                    title: obj.title,
                    addr: obj.addr,
                    tele: obj.tele,
                    intro: obj.intro,
                    video: video,
                    type: obj.type,
                    pre: [{
                        url: "/operation", 
                        label: "场馆运营"
                    }, {
                        url: "/operation/place?type=" + obj.type, 
                        label: obj.typename
                    }]
                });
            _item.save()
                .then(function (data, num) {
                    handleDB(req, res, "add", num);
                    console.log('save operation data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save operation data err: ---', err);
                });
            break;
        }
        case "modify": {
            _model
                .update({_id: obj._id}, {$set: {
                    imageurl: imageurl,
                    title: obj.title,
                    addr: obj.addr,
                    tele: obj.tele,
                    intro: obj.intro,
                    video: video
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
        case "delete": {
            _model
                .remove({_id: obj.data._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
}
exports.editTrain = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
   var _model = models.trains;

    if(action != 'delete') {
        var imageurl = (files.imageurl && files.imageurl.length > 0 && files.imageurl[0].filename.length > 0) ? ('/images/uploads/' + files.imageurl[0].filename) : (obj.imageurl_url),
            video = (files.video && files.video.length > 0 && files.video[0].filename.length > 0) ? ('/images/uploads/' + files.video[0].filename) : (obj.video_url);
    }
    
    switch(action) {
        case "add": {
            var _item = new _model({
                imageurl: imageurl,
                title: obj.title,
                addr: obj.addr,
                tele: obj.tele,
                intro: obj.intro,
                video: video,
                type: obj.type,
                pre: [{
                    url: "/train", 
                    label: "体育培训"
                }, {
                    url: "/train/train?type=" + obj.type, 
                    label: obj.typename
                }]
            });
            _item.save()
                .then(function (data, num) {
                    handleDB(req, res, "add", num);
                    console.log('save train data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save train data err: ---', err);
                });
            break;
        }
        case "modify": {
            _model
                .update({_id: obj._id}, {$set: {
                    imageurl: imageurl,
                    title: obj.title,
                    addr: obj.addr,
                    tele: obj.tele,
                    intro: obj.intro,
                    video: video
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
        case "delete": {
            _model
                .remove({_id: obj.data._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
}

exports.editPlaneType = function (req, res) {
    var obj = req.body.data,
        action = req.body.action;
    var _model = models.planetypes;
    switch(action) {
        case "add": {
            var promise = _model
                .find()
                .sort({type: -1});
            promise
                .then(function (types) {
                    var _item = new _model({
                        name: obj.name,
                        type: parseInt(types[0].type)+1
                    });
                    _item.save()
                        .then(function (data, num) {
                            handleDB(req, res, "add", num);
                            console.log('save plane type data: ---', data);
                        })
                        .catch(function (err) {
                            handleDB(req, res, "db error");
                            console.log('save plane type data err: ---', err);
                        });
                });
            
            break;
        }
        case "delete": {
            _model
                .remove({_id: obj._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
}

exports.editOperationType = function (req, res) {
    var obj = req.body.data,
        action = req.body.action;
    var _model = models.operationtypes;
    switch(action) {
        case "add": {
            var _item = new _model(obj);
            _item.save()
                .then(function (data, num) {
                    handleDB(req, res, "add", num);
                    console.log('save operation type data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save operation type data err: ---', err);
                });
            break;
        }
        case "delete": {
            _model
                .remove({_id: obj._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
} 

exports.editTrainType = function (req, res) {
    var obj = req.body.data,
        action = req.body.action;
    var _model = models.traintypes;
    switch(action) {
        case "add": {
            var _item = new _model(obj);
            _item.save()
                .then(function (data, num) {
                    handleDB(req, res, "add", num);
                    console.log('save train type data: ---', data);
                })
                .catch(function (err) {
                    handleDB(req, res, "db error");
                    console.log('save train type data err: ---', err);
                });
            break;
        }
        case "delete": {
            _model
                .remove({_id: obj._id})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                });
            break; 
        }
    }  
}

exports.editCompanyInfo = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    var _model = models.companyInfos;

    var logo = (files.logo && files.logo.length > 0 && files.logo[0].filename.length > 0) ? ('/images/uploads/' + files.logo[0].filename) : (obj.logo_url),
        aboutusImg = (files.aboutusImg && files.aboutusImg.length > 0 && files.aboutusImg[0].filename.length > 0) ? ('/images/uploads/' + files.aboutusImg[0].filename) : (obj.aboutusImg_url),
        wechat = (files.wechat && files.wechat.length > 0 && files.wechat[0].filename.length > 0) ? ('/images/uploads/' + files.wechat[0].filename) : (obj.wechat_url),
        arr = [];
    if(files.friendlogo && files.friendlogo.length > 0) {
        arr = files.friendlogo.map(function (item) {
            return item.path.replace(/public/i, "");
        })
    }

    switch(action) {
        case "modify": {
            var promise = _model
                .findOne({_id: obj._id})
                .exec();
            promise.then(function (data) {

                var friends = data.friends.concat(arr);
                // res.json({
                //     friends: friends
                // })
                // return ;
                _model
                    .update({_id: obj._id}, {$set: {
                        logo: logo,
                        aboutusImg: aboutusImg,
                        addr: obj.addr,
                        intro: obj.intro,
                        mail: obj.mail,
                        phone: obj.phone,
                        wechat: wechat
                        // friends: friends
                    }})
                    .exec(function (_err, _result) {
                        handleDB(req, res, _err, _result);
                    }); 
            });

            break;
        }
    }  
} 

exports.editFriend = function (req, res) {
    var obj = req.body,
        action = obj.action,
        files = req.files;
    
    var _model = models.companyInfos;
    var promise = _model
        .findOne()
        .exec();

    promise.then(function (data) {
        var friends = data.friends;
        switch(action) {
            case "add": {
                var flogo = (files.flogo && files.flogo.length > 0) ? files.flogo[0] : {};
                var path = flogo.path || ""; 
                var fid = friends.length;
                path = path.replace(/public/i, "");
                friends.push({
                    fid: fid,
                    flogo: path,
                    flink: obj.flink,
                    fintro: obj.fintro
                });
                _model
                    .update({_id: data._id}, {$set: {
                        friends: friends
                    }})
                    .exec(function (_err, _result) {
                        handleDB(req, res, _err, _result);
                    }); 

                break;
            }
            case "modify": {
                var flogo = (files.flogo && files.flogo.length > 0) ? files.flogo[0] : {};
                path = flogo.path || friends[obj.fid].flogo;
                path = path.replace(/public/i, "");
                friends[obj.fid] = {
                    fid: obj.fid,
                    flogo: path,
                    flink: obj.flink,
                    fintro: obj.fintro
                }
                _model
                    .update({_id: data._id}, {$set: {
                        friends: friends
                    }})
                    .exec(function (_err, _result) {
                        handleDB(req, res, _err, _result);
                    }); 
                return ;
            }
            case "delete": {
                friends.splice(obj.data.fid, 1);
                for(var i = 0; i < friends.length; i++) {
                    friends[i].fid = i;
                }
                _model
                    .update({_id: data._id}, {$set: {
                        friends: friends
                    }})
                    .exec(function (_err, _result) {
                        handleDB(req, res, _err, _result);
                    }); 
                return ;
            }
        }
            
    });

}

exports.editStatistic = function (req, res) {
    var obj = req.body,
        action = req.body.action;
    var _model = models.statistic;
    switch(action) {
        case "modify": {
            _model
                .update({_id: obj._id}, {$set: {
                    planeNum: obj.planeNum,
                    operationNum: obj.operationNum,
                    trainNum: obj.trainNum,
                    totalAmount: obj.totalAmount
                }})
                .exec(function (_err, _result) {
                    handleDB(req, res, _err, _result);
                }); 
            break;
        }
    }  
}

function handleDB(req, res, _err, _result) {
    if(_err == "db error") {
        res.json({
            code: 100,
            errmsg: "数据库访问失败"
        });
        return;
    }
    if(_err == "add" && _result > 0) {
        res.json({
            code: 200,
            msg: "添加成功"
        });
        return ;
    }
    var result = checkDataBase(_err, _result);
    res.json(result);
}


function checkDataBase(_err, _result) {
    var _ret = null;
    if (_result.ok) {
        _ret = { 
            code: 200, 
            msg: "操作成功"
        }; 
    } else {
        _ret = {
            code: 300,
            msg: "操作失败"
        };
    }
    return _ret;
}





