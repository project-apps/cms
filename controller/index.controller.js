const indexService = require('../service/index.service.js'),
  express = require('express'),
  logger = require('../util/log4js.js');

exports.get = (req, res) => {
  let header = req.params.header;
  logger.debug('Header request for:'+header);
  let req_param = {'header': header};
  indexService.get(req_param, (err, headerDetails)=>{
    new Promise((resolve, reject)=>{
      if(err){
        reject(err);
      }else if(Object.keys(headerDetails).length<1) {
          logger.debug('No data found for Header:'+header);
      }else{
         logger.debug('Data found for Header:'+header+', is as below:\n'+ JSON.stringify(headerDetails));
      }
      resolve(headerDetails);
    }).then(value=>{
      res.status(200);
      res.send(value);
    }).catch(err=>{
      res.status(404);
      res.send('Error while fetching data.');
      logger.error(`Error while fetching data:\n${err.stack || err}`);
    });
  });
};
exports.getFile = (req, res)=>{
  let filePath = decodeURI(req.params.filePath);
  logger.debug(`File Rquested for: ${filePath}`);
  res.sendFile(filePath);  
}