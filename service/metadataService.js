'use strict';
const path = require('path'),
    logger = require('../util/log4js.js'),
    bucketReader = require('../reader/googleBucketReader.js'),
    directoryReader = require('../reader/directoryReader.js');
var PropertyReader = require('properties-reader');
var prop = PropertyReader('./resource.properties');

exports.getDirectoryMetadata = (query_param, cb)=>{
    let dirPath = prop.get('file.dir').toString() + path.sep + query_param.path;
    logger.debug('Reading dir: '+dirPath);
    directoryReader.listDirFilesTree(dirPath, (err, dirTree)=>{
        return cb(err, dirTree);
    });
}

exports.getBucketMetadata = (query_param, cb)=>{    
    let bucketname = prop.get('google.bucket.name').toString();
    logger.debug('Requesting for Google Bucket: '+bucketname);
    var absPath = 'staticContents/'+query_param.path;
    logger.debug('Requesting for Path: '+absPath);
    bucketReader.listFiles(bucketname, absPath, (err, files)=>{
        return cb(err, files);
    });
  }