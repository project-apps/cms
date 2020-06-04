'use strict'
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: "*********",
  secretAccessKey: "********"
});
var s3 = new AWS.S3();
exports.listObjects = (params, path, cb)=>{
  try{
    s3.listObjects(params, (err, data)=>{
      return cb(err, data);
    });
  }catch(e){
    return cb(e);
  }
}
exports.getObject = (params, cb)=>{
  try{
    s3.getObject(params, (err, data)=>{
      return cb(err, data);
    });
  }catch(e){
    return cb(e);
  }
  
}
