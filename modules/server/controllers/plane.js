
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/config"),
    models = require("../models/model");


exports.getPlanes = function (req, res) {
    var _planeModel = models.plane;
    if(parseInt(req.body.type) == 0) {
        _planeModel
            .find()
            .exec(function (_err, _result) {
                handleDB(req, res, _err, _result);
            });
        return ;
    }
    _planeModel
        .find({type: parseInt(req.body.type)})
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        });
}
exports.addPlanes = function(req, res) {
    var _planeModel = models.plane;
    _planeModel.create(req.body);
}
exports.getPlaneTypes = function (req, res) {
    var _model = models.planetypes;
    _model
        .find()
        .exec(function (_err, _result) {
            handleDB(req, res, _err, _result);
        });
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