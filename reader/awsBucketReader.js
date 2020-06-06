'use strict'
const logger = require('../util/log4js.js');
var AWS = require('aws-sdk');
/*if (process.env.AWS_Access_key_ID && process.env.AWS_Secret_access_key) {
  const accessKeyId = process.env.AWS_Access_key_ID;
  const secretAccessKey = process.env.AWS_Secret_access_key;
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });
}*/
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse (process.env.VCAP_SERVICES);
  const accessKeyId = env.AWS_Access_key_ID;
  const secretAccessKey = env.AWS_Secret_access_key;
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });
}
else{
  var msg = "Unable to configure AWS security keys from VCAP_SERVICES.";
  logger.error(msg);
  throw new Error(msg);
}
//const accessKeyId = process.env.accessKeyId;;
//const secretAccessKey = process.env.secretAccessKey;;

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
