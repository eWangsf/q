
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/config"),
    models = require("../models/model");

exports.getStatics = function (req, res) {
    // addTest();
    var _staticsModel = models.statistic;
    _staticsModel
        .findOne()
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        });
}

exports.getCarousel = function (req, res) {
    var _carousel = models.Carousels;
    _carousel
        .find()
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        });   
}

exports.getComments = function (req, res) {
    var _comment = models.Comments;
    _comment
        .find()
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        })
}

exports.getAboutInfo = function (req, res) {
    var _companyinfo = models.companyInfos;
    _companyinfo
        .findOne()
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        })
}

function handleDB(req, res, _err, _result) {
    var result = checkDataBase(_err, _result);
    res.json(result);
}


function checkDataBase(_err, _result) {
    if (_err) {
        return { 
            error: true, 
            msg: _err.toString()
        };
    }
    return _result;
}


function addTest() {

    // var _staticsModel = models.statistic;
    // var x = new _staticsModel({
    //     planeNum: 12345,
    //     planeImgUrl: "/images/erweima.jpg",
    //     operationNum: 43210,
    //     operationImgUrl: "/images/erweima.jpg",
    //     trainNum: 867,
    //     trainImgUrl: "/images/erweima.jpg"
    // });
    // x.save()
    //     .then(function (data) {
    //         console.log('save statistic data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save statistic data err: ---', err);
    //     });

    // var test = models.testSchema;
    // var testdata = new test({
    //     id: 1,
    //     name: "wsf1",
    //     age: 21
    // })
    // testdata.save()
    //     .then(function (data) {
    //         console.log('save testschema data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save testschema data err: ---', err);
    //     });

    // var Carousels_s = models.Carousels,
    //     carousel_obj = [{
    //         "imageurl" : "/images/9.jpeg",
    //         "name" : "活动策划",
    //         "link" : "/plane",
    //         "active" : "active"
    //     }, {
    //         "imageurl" : "/images/pic2.jpg",
    //         "name" : "场馆运营",
    //         "link" : "/operation",
    //         "active" : ""
    //     }, {
    //         "imageurl" : "/images/pic1.jpg",
    //         "name" : "体育培训",
    //         "link" : "/train",
    //         "active" : ""
    //     }];
    // carousel_obj.forEach(function (item, index) {
    //     var d = new Carousels_s(item);
    //     d.save()
    //     .then(function (data) {
    //         console.log('save carousel data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save carousel data err: ---', err);
    //     });
    // });

    // var commentModel = models.Comments,
    //     comment_obj = [{
    //         "avatar": "/images/avatar1.png",
    //         "name": "name1",
    //         "job": "job1",
    //         "content": "comment1"
    //     }, {
    //         "avatar": "/images/avatar1.png",
    //         "name": "name2",
    //         "job": "job2",
    //         "content": "comment2"
    //     }, {
    //         "avatar": "/images/avatar1.png",
    //         "name": "name3",
    //         "job": "job3",
    //         "content": "comment3"
    //     }, {
    //         "avatar": "/images/avatar1.png",
    //         "name": "name4",
    //         "job": "job4",
    //         "content": "comment4"
    //     }];
    // comment_obj.forEach(function (item, index) {
    //     var c = new commentModel(item);
    //     c.save()
    //     .then(function (data) {
    //         console.log('save comment data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save comment data err: ---', err);
    //     });
    // });

    // var planeModel = models.plane,
    //     plane_obj = [{
    //         imageurl: "/images/1.png",
    //         title: "plane标题1",
    //         type: [1,2,3],
    //         membernum: 2000
    //     }, {
    //         imageurl: "/image/images/1.png",
    //         title: "plane标题2",
    //         type: [1,2,3],
    //         membernum: 2000
    //     }, {
    //         imageurl: "/image/images/1.png",
    //         title: "plane标题3",
    //         type: [1,2,3],
    //         membernum: 2000
    //     }, {
    //         imageurl: "/image/images/1.png",
    //         title: "plane标题4",
    //         type: [1,2,3],
    //         membernum: 2000
    //     }];
    // plane_obj.forEach(function (item, index) {
    //     var c = new planeModel(item);
    //     c.save()
    //     .then(function (data) {
    //         console.log('save plane data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save plane data err: ---', err);
    //     });
    // });

    // var opplaceModel = models.operationplaces,
    //     opplace_obj = [{
    //         imageurl: "/images/1.png",
    //         title: "海润羽毛球馆1",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润羽毛球馆_1',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_1_badminton',
    //         video: '/images/1.mov',
    //         type: 'badminton'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润羽毛球馆2",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润羽毛球馆_2',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_2_badminton',
    //         video: '/images/1.mov',
    //         type: 'badminton'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润羽毛球馆3",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润羽毛球馆_3',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_3_badminton',
    //         video: '/images/1.mov',
    //         type: 'badminton'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润羽毛球馆4",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润羽毛球馆_4',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_4_badminton',
    //         video: '/images/1.mov',
    //         type: 'badminton'
    //     }, {
    //         imageurl: "/images/1.png",
    //         title: "海润网球馆1",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润网球馆_1',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_1_tennis',
    //         video: '/images/1.mov',
    //         type: 'tennis'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润网球馆2",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润网球馆_2',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_2_tennis',
    //         video: '/images/1.mov',
    //         type: 'tennis'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润网球馆3",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润网球馆_3',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_3_tennis',
    //         video: '/images/1.mov',
    //         type: 'tennis'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润网球馆4",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润网球馆_4',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_4_tennis',
    //         video: '/images/1.mov',
    //         type: 'tennis'
    //     }, {
    //         imageurl: "/images/1.png",
    //         title: "海润足球馆1",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润足球馆_1',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_1_football',
    //         video: '/images/1.mov',
    //         type: 'football'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润足球馆2",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润足球馆_2',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_2_football',
    //         video: '/images/1.mov',
    //         type: 'football'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润足球馆3",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润足球馆_3',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_3_football',
    //         video: '/images/1.mov',
    //         type: 'football'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润足球馆4",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润足球馆_4',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_4_football',
    //         video: '/images/1.mov',
    //         type: 'football'
    //     }, {
    //         imageurl: "/images/1.png",
    //         title: "海润游泳馆1",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润游泳馆_1',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_1_swimming',
    //         video: '/images/1.mov',
    //         type: 'swimming'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润游泳馆2",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润游泳馆_2',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_2_swimming',
    //         video: '/images/1.mov',
    //         type: 'swimming'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润游泳馆3",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润游泳馆_3',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_3_swimming',
    //         video: '/images/1.mov',
    //         type: 'swimming'
    //     }, {
    //         imageurl: "/images/erweima.jpg",
    //         title: "海润游泳馆4",
    //         tele: '0571-21111111',
    //         addr: '深圳-南山区 南海大道1105号海润游泳馆_4',
    //         intro: '海润羽毛球馆是一家羽毛球生态馆，除了羽毛球外，顾客可以在这里体验攀岩、健身、咖啡、瑜伽、中医理疗等服务。_4_swimming',
    //         video: '/images/1.mov',
    //         type: 'swimming'
    //     }];
    // opplace_obj.forEach(function (item, index) {
    //     var c = new opplaceModel(item);
    //     c.save()
    //     .then(function (data) {
    //         console.log('save operation place data: ---', data);
    //     })
    //     .catch(function (err) {
    //         console.log('save operation place data err: ---', err);
    //     });
    // });
    

    // var trainModel = models.trains,
    //     types = {
    //         'badminton': '羽毛球',
    //         'tennis': '网球',
    //         'football': '足球',
    //         'swimming': '游泳',
    //         'basketball': '篮球',
    //         'score': '中考体育'
    //     };
    // for(var key in types) {
    //     for(var i = 0; i < 5; i++) {
    //         var obj = {
    //             imageurl: '/images/4.png',
    //             title: '培训_'+key+' ('+types[key]+')',
    //             tele: '010-21111111',
    //             addr: '深圳-南山_'+key,
    //             type: key
    //         };
    //         var c = new trainModel(obj);
    //         c.save()
    //             .then(function (data) {
    //                 console.log('save train data: ---', data);
    //             })
    //             .catch(function (err) {
    //                 console.log('save train data err: ---', err);
    //             }); 
    //     }
    // }
    var companyModel = models.companyInfos;
    var obj = {
        logo: "/images/logo7-2.png",
        aboutImg: "/images/logo5.jpg",
        phone: "0755-22721375",
        mail: "2530557206@qq.com",
        aboutusImg: "/images/aboutus.jpg",
        intro: "深圳力雅体育投资发展有限公司是以体育产业化为主导、致力于体育产业开发、体育营销和赛事推广、体育传媒经营为一体的专业运营机构，是国家“全民健身工程”的推动者：是党中央在新时期提出的“开展全民体育健身活动，提高全民族健康素质”的积极响应者。公司秉承“健身全民、服务大众”的行业运作理念，盘活了体育专业人才、汇聚了大批体育策划经营、专业从事大型体育赛事活动的策划、包装、推广以及企事业，各大行业的运动会、趣味运动会、体育娱乐活动的策划和实施。除自创的体育赛事品牌外，并为政府机关事业单位及大型企业集团提供量身定做的趣味体育文化设计，及承接年会，庆典等。同时承包经营多处综合体育场馆，并联合多家体育健身场所，休闲俱乐部，成立了网球、足球、篮球、乒乓球、健身、台球、羽毛球等健身交友俱乐部。并与国内各大城市十几家体育用品专卖店和经销商建立了体育产业公司，致力于为事业单位提供最新、最好的体育用品及团队装备。",
        wechat: "/images/erweima.jpg",
        friends: []
    };
    var c = new companyModel(obj);
    c.save(obj)
        .then(function (data) {
            console.log('save company data: ---', data);
        })
        .catch(function (err) {
            console.log('save company data err: ---', err);
        });
    

}





