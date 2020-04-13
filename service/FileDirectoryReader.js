const fs = require('fs'),
PATH = require('path'),
dirTree = require('directory-tree'),
logger = require('../util/log4js.js');

exports.readDirectory = (dirPath, cb)=> {
    logger.debug('Reding dir: '+dirPath);
    new Promise((resolve, reject)=>{
        if (!fs.existsSync(dirPath)) {
            reject(new Error(`Can't find path: ${dirPath} in header.`))
        }
        dirTree(dirPath, {extensions:/\.(md|js|html|java|py|rb|txt)$/}, null, (item, PATH, stats) => {
            if(item.path == dirPath){
                resolve(item);                
            }
        });
    }).then(item=>{    
        return cb(null, item);
    }).catch(err=>{
        return cb(err);
    });
}
