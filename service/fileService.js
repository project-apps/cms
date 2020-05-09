'use strict';
const path = require('path'),
    logger = require('../util/log4js.js'),
    bucketReader = require('../reader/googleBucketReader.js'),
    directoryReader = require('../reader/directoryReader.js');
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');


exports.readFileFromBucket = (filePath, cb)=>{    
   try{    
      let bucketname = prop.get('google.bucket.name').toString();
      logger.debug(`Reading file: ${filePath}, from Google-Bucket: ${bucketname}.`);
      filePath = 'staticContents/'+filePath;
      bucketReader.readFile(bucketname, filePath, (err, data)=>{
	if(err){
	  return cb(err);
	}        
        return cb(null, data);
    });
   }catch(e){
	return cb(e);	
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
