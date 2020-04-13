'use strict';
const path = require('path'),
    logger = require('../util/log4js.js');
var fileDirectoryReader = require('../service/FileDirectoryReader.js')
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');

exports.get = (req_param, cb)=>{
    let readerFilePath = prop.get('file.dir').toString() + path.sep + req_param.header;
    fileDirectoryReader.readDirectory(readerFilePath, (err, tree)=>{
        return cb(err, tree);
    });
}
exports.getFile = (req_param, cb)=>{
    let filePath = req_param.filePath;
    false.readFileSync(filePath, 'utf-8');
}