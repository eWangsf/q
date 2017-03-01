
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/config"),
    models = require("../models/model"),
    q = require('q');

exports.getDetail = function (req, res) {
    var para = req.body.id;
    var _operationModel = models.operationplaces;

    var promise1 = models.operationplaces
        .find({_id: para});
    var promise2 = models.plane
        .find({_id: para});
    var promise3 = models.trains
        .find({_id: para});

    q.all([promise1, promise2, promise3])
        .then(function (data) {
            for(var index in data) {
                if(data[index].length > 0) {
                    var obj = data[index][0];
                    res.json({index: index, data: obj});
                }
            }
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





