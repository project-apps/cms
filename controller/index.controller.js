const indexService = require('../service/index.service.js'),
  express = require('express'),
  logger = require('../util/log4js.js');

exports.index = (req, res) => {
  let index = req.query.path;
  logger.debug('Index request for:'+index);
  let query_param = {'index': index};
  indexService.get(query_param, (err, headerDetails)=>{
    new Promise((resolve, reject)=>{
      if(err){
        reject(err);
      }else if(Object.keys(headerDetails).length<1) {
          logger.debug('No data found for Index:'+index);
      }else{
         logger.debug('Data found for Header:'+index+', is as below:\n'+ JSON.stringify(headerDetails));
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
exports.file = (req, res)=>{
  let filePath = decodeURIComponent(req.query.path);
  logger.debug(`File Rquested for: ${filePath}`);
  indexService.getFile(filePath, (err, file)=>{
     if(err){
	res.status(404);
      	res.send('Error while fetching data.');
      	logger.error(`Error while fetching data:\n${err.stack || err}`);
	}else{
  	   res.sendFile(file);  
	}
  });  
}
