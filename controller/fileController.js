'use strict'
const fileService = require('../service/fileService.js'),
express = require('express'),
logger = require('../util/log4js.js');

exports.readFileFromBucket = (req, res)=>{
    let filePath = decodeURIComponent(req.query.path);
    logger.debug('File request for:'+filePath);
    fileService.readFileFromBucket(filePath, (err, fileData)=>{
      new Promise((resolve, reject)=>{
        if(err){
          reject(err);
        }
        resolve(fileData);
      }).then(value=>{
        res.status(200);
        res.send(value);
      }).catch(err=>{
        logger.error(`Error while fetching data:\n${err.stack || err}`);
        res.status(404);
        res.send('Error while fetching data.');
      });
      
      /*for(const[key, value] of Object(metadata)){
        logger.debug(`${key}:${value}`);
      }*/
    });
  }

  exports.readFileFromDirectory = (req, res)=>{
    let filePath = decodeURIComponent(req.query.path);
    logger.debug(`File Rquested for: ${filePath}`);
    fileService.readFileFromDirectory(filePath, (err, file)=>{
	new Promise((resolve, reject)=>{
	  if(err){
	    reject(err);
	  }
	 resolve(file);
	}).then(value=>{
	 res.status(200);
	 res.sendFile(value);
	}).catch(err=>{
          logger.error(`Error while fetching data:\n${err.stack || err}`);
	  res.status(404);
          res.send('Error while fetching data.');
	});
    });  
  }
