
var multer = require('multer'),
    // upload = multer({
    //     dest:'./public/images/uploads/', 
    //     limits: {
    //         fileSize: 10*1024*1024
    //     }
    // });
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/uploads/')
        },
        filename: function (req, file, cb) {
            var fileformat = (file.originalname).split('.');
            cb(null, file.fieldname + Date.now() + "." + fileformat[fileformat.length-1]);
        }
    }),
    upload = multer({storage: storage});

module.exports = function (app) {

    var core = require('../controllers/core.js'),
        home = require('../controllers/home.js'),
        plane = require('../controllers/plane.js'),
        operation = require('../controllers/operation.js'),
        train = require('../controllers/train.js'),
        data = require('../controllers/data.js'),
        admin = require('../controllers/admin.js');

    // home
    app.route('/api/statistics').get(home.getStatics);
    app.route('/api/carousels').post(home.getCarousel);
    app.route('/api/comments').post(home.getComments);
    app.route('/api/about').post(home.getAboutInfo)

    // plane
    app.route('/api/plane/planes').post(plane.getPlanes);
    app.route('/api/plane/add').post(plane.addPlanes);
    app.route('/api/plane/types').post(plane.getPlaneTypes);

    // operation
    app.route('/api/operation/type').post(operation.getByType);
    app.route('/api/operation/detail').post(operation.getById);
    app.route('/api/operation/types').post(operation.getOperationTypes);

    // train
    app.route('/api/train/trainoftype').post(train.getByType);
    app.route('/api/train/types').post(train.getTrainTypes);

    app.route('/api/detail').post(data.getDetail);



    // admin
    app.post("/upload", 
        upload.array("append", 10),
        function (req, res) {
            res.json({
                append: req.files
            });
        });
    app.route('/api/admin/home/data').post(admin.getHomeData);
    app.post('/api/admin/carousel/edit',
        upload.fields([
            {name: "imageurl", maxCount: 1}
        ]),
        admin.editCarousel);
    app.post('/api/admin/comment/edit',
        upload.fields([
            {name: "avatar", maxCount: 1}
        ]),
        admin.editComment);
    app.post('/api/admin/plane/edit',
        upload.fields([
            {name: "imageurl", maxCount: 1},
            {name: "video", maxCount: 1},
            {name: "append", maxCount: 5}         
        ]),
        admin.editPlane);
    app.post('/api/admin/place/edit',
        upload.fields([
            {name: "imageurl", maxCount: 1},
            {name: "video", maxCount: 1}           
        ]),
        admin.editPlace);
    app.post('/api/admin/train/edit',
        upload.fields([
            {name: "imageurl", maxCount: 1},
            {name: "video", maxCount: 1}            
        ]), 
        admin.editTrain);
    app.route('/api/admin/plane/type/edit').post(admin.editPlaneType);
    app.route('/api/admin/operation/type/edit').post(admin.editOperationType);
    app.route('/api/admin/train/type/edit').post(admin.editTrainType);
    app.post('/api/admin/company/edit', 
        upload.fields([
            {name: "logo", maxCount: 1}, 
            {name: "aboutusImg", maxCount: 1}, 
            {name: "locationImg", maxCount: 1}, 
            {name: "wechat", maxCount: 1},
            {name: "flogo", maxCount: 10}
        ]), 
        admin.editCompanyInfo);
    app.post('/api/admin/company/friend', 
        upload.fields([
            {name: "flogo", maxCount: 1}
        ]), 
        admin.editFriend);
    app.route('/api/admin/statistic/edit').post(admin.editStatistic);


    app.route('/admin').get(core.renderAdmin);
    app.route('/*').get(core.renderIndex);
    

}








