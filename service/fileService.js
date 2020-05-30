'use strict';
const path = require('path'),
    logger = require('../util/log4js.js'),
	bucketReader = require('../reader/googleBucketReader.js'),
	awsBucketReader = require('../reader/awsBucketReader.js'),
    directoryReader = require('../reader/directoryReader.js');
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');
const bucketname = prop.get('bucket.name').toString();
const rootpath = prop.get('bucket.rootPath').toString();

exports.getObject = (queryParams, cb)=>{    
	let filePath = queryParams.objPath;
	if(!isStartsWith(filePath, '/')){
		filePath = '/'+filePath ;	
	}
	filePath = rootpath+filePath;
	let provider = queryParams.provider;
	logger.debug(`Reading file: ${filePath}, from ${provider} Bucket: ${bucketname}.`);
	if("AWS"=== (provider.toUpperCase())){
		var params = {
			Bucket: bucketname,
			Key: filePath
		};
		awsBucketReader.getObject(params, (err, object)=>{
			let objectData = object.Body.toString('utf-8'); 
			return cb(err, objectData);

		});
	}else if("GOOGLE"=== (provider.toUpperCase())){      	
      	filePath = 'staticContents/'+filePath;
      	bucketReader.readFile(bucketname, filePath, (err, data)=>{
		if(err){
	  		return cb(err);
		}        
    	return cb(null, data);
    	});
	}else{

	}
}
exports.readFileFromDirectory = (filePath, cb)=>{
	try{
	filePath = prop.get('file.dir').toString() + path.sep + filePath;
	directoryReader.readFile(filePath, (err, result)=>{
		if(err){
			return cb(err);			
		}
		return cb(null, result);
		});	
	}catch(e){
		return cb(e);	
	}
}
function isStartsWith(data, key){
	return (data.charAt(0)==='/');
}