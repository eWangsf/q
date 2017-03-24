'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testSchema = new Schema({
    id: Number,
    name: String,
    age: Number
});

var CarouselSchema = new Schema({
    imageurl: String,
    name: String,
    link: String,
    active: String
});

var CommentsSchema = new Schema({
    avatar: String,
    name: String,
    job: String,
    content: String
});

var planeSchema = new Schema({
    imageurl: String,
    title: String,
    type: Number,
    membernum: Number,
    intro: String,
    video: String,
    pre: Array
});

var operationPlaceSchema = new Schema({
    imageurl: String,
    title: String,
    tele: String,
    addr: String,
    intro: String,
    video: String,
    type: String,
    pre: Array
});
var trainSchema = new Schema({
    imageurl: String,
    title: String,
    tele: String,
    addr: String,
    intro: String,
    video: String,
    type: String,
    pre: Array
});
var staticsSchema = new Schema({
    planeNum: Number,
    planeImgUrl: String,
    operationNum: Number,
    operationImgUrl: String,
    trainNum: Number,
    trainImgUrl: String,
    totalAmount: Number
});

var companyInfo = new Schema({
    logo: String,
    aboutImg: String,
    phone: String,
    mail: String,
    addr: String,
    locationImg: String,
    aboutusImg: String,
    intro: String,
    wechat: String,
    friends: Array
});

var planeTypes = new Schema({
    name: String,
    type: Number
});

var operationTypes = new Schema({
    name: String,
    type: String
});

var trainTypes = new Schema({
    name: String,
    type: String
});

(function () {
    var schemaList = {
        "testSchema": testSchema,
        "Carousels": CarouselSchema,
        "Comments": CommentsSchema,
        'plane': planeSchema,
        'operationplaces': operationPlaceSchema,
        'statistic': staticsSchema,
        'trains': trainSchema,
        'companyInfos': companyInfo,
        'planetypes': planeTypes,
        'operationtypes': operationTypes,
        'traintypes': trainTypes
    };
    for (var schema in schemaList) {
        exports[schema] = mongoose.model(schema, schemaList[schema]);
    }

    console.log('Database scheme registered.');

}());







