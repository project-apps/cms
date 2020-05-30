const metadataService = require('../service/metadataService.js'),
  logger = require('../util/log4js.js');

exports.getDirectoryMetadata = (req, res) => {
  let path = req.query.path;
  logger.debug('Path request in getDirectoryMetadata:'+path);
  let query_param = {'path': path};
  metadataService.getDirectoryMetadata(query_param, (err, dirTree)=>{
    new Promise((resolve, reject)=>{
      if(err){
        reject(err);
      }else if(Object.keys(dirTree).length<1) {
          logger.debug('No data found for path:'+path);
      }else{
         logger.debug('Data found for path:'+path+', is as below:\n'+ JSON.stringify(dirTree));
      }
      resolve(dirTree);
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

exports.listObjects = (req, res)=>{
  let path = req.query.path;
  logger.debug('Path request for:'+path);
  let params = {'path': path, 'provider': 'aws'};
  metadataService.listObjects(params, (err, metadata)=>{
    new Promise((resolve, reject)=>{
      if(err){
        reject(err);
      }else if(metadata) {
        resolve(metadata);
        //logger.debug('Data found for Header:'+path+', is as below:\n'+ JSON.stringify(metadata));
      }else{
        logger.debug(`No data found for Path: ${path}`);
    }
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