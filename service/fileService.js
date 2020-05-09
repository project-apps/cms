'use strict';
const path = require('path'),
    logger = require('../util/log4js.js'),
    bucketReader = require('../reader/googleBucketReader.js'),
    directoryReader = require('../reader/directoryReader.js');
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');


exports.readFileFromBucket = (query_param, cb)=>{    
    let bucketname = prop.get('google.bucket.name').toString();
    logger.debug('Requesting for Google Bucket: '+bucketname);
    bucketReader.readFile(bucketname, query_param.path, (err, data)=>{
        return cb(err, data);
    });
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