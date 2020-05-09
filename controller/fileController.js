'use strict'
const fileService = require('../service/fileService.js'),
express = require('express'),
logger = require('../util/log4js.js');

exports.readFileFromBucket = (req, res)=>{
    let path = req.query.path;
    logger.debug('Path request for:'+path);
    let query_param = {'path': path};
    fileService.readFileFromBucket(query_param, (err, fileData)=>{
      new Promise((resolve, reject)=>{
        if(err){
          reject(err);
        }else if(Object.keys(fileData).length<1) {
          logger.debug('No data found for Path:'+path);
      }else{
        // logger.debug('Data found for Header:'+path+', is as below:\n'+ fileData);
      }
      resolve(fileData);
      }).then(value=>{
        res.status(200);
        res.send(value);
      }).catch(err=>{
        res.status(404);
        res.send('Error while fetching data.');
        logger.error(`Error while fetching data:\n${err.stack || err}`);
      });
      
      if(err){
        logger.error(err);
      }
      /*for(const[key, value] of Object(metadata)){
        logger.debug(`${key}:${value}`);
      }*/
    });
  }

  exports.readFileFromDirectory = (req, res)=>{
    let filePath = decodeURIComponent(req.query.path);
    logger.debug(`File Rquested for: ${filePath}`);
    fileService.readFileFromDirectory(filePath, (err, file)=>{
       if(err){
    res.status(404);
          res.send('Error while fetching data.');
          logger.error(`Error while fetching data:\n${err.stack || err}`);
    }else{
         res.sendFile(file);  
    }
    });  
  }