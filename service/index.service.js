'use strict';
const path = require('path'),
    logger = require('../util/log4js.js');
var fileDirectoryReader = require('../service/FileDirectoryReader.js')
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');

exports.get = (query_param, cb)=>{
    let readerFilePath = prop.get('file.dir').toString() + path.sep + query_param.index;
    fileDirectoryReader.readDirectory(readerFilePath, (err, tree)=>{
        return cb(err, tree);
    });
}
exports.getFile = (filePath, cb)=>{
	try{
	filePath = prop.get('file.dir').toString() + path.sep + filePath;
	fileDirectoryReader.existsSync(filePath, (err, result)=>{
		if(err){
			return cb(err);			
		}
		return cb(null, result);
		});	
	}catch(e){
		return cb(e);	
	}
}
