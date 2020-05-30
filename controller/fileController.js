'use strict'
const fileService = require('../service/fileService.js'),
express = require('express'),
logger = require('../util/log4js.js');

exports.getObject = (req, res)=>{
    let objPath = decodeURIComponent(req.query.path);
    logger.debug('File request for:'+ objPath);
    let params = {'objPath': objPath, 'provider': 'aws'};
    fileService.getObject(params, (err, fileData)=>{
      new Promise((resolve, reject)=>{
        if(err){
          reject(err);
        }
        resolve(fileData);
      }).then(value=>{
        res.status(200);
        res.send(value);
      }).catch(err=>{
        logger.error(`Error while reading path: ${err.stack || err}`);
        res.status(404);
        res.send(err);
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
    logger.error(`Error in reading path: ${err.stack || err}`);
	  res.status(404);
    res.send(err);
	});
    });  
  }
