'use strict';
const path = require('path'),
    logger = require('../util/log4js.js'),
    googleBucketReader = require('../reader/googleBucketReader.js'),
    awsBucketReader = require('../reader/awsBucketReader.js'),
    directoryReader = require('../reader/directoryReader.js');
var PropertyReader = require('properties-reader');
const prop = PropertyReader('./resource.properties');
const bucketname = prop.get('bucket.name').toString();
const rootpath = prop.get('bucket.rootPath').toString();
exports.getDirectoryMetadata = (query_param, cb)=>{
    let dirPath = prop.get('file.dir').toString() + path.sep + query_param.path;
    logger.debug('Reading dir: '+dirPath);
    directoryReader.listDirFilesTree(dirPath, (err, dirTree)=>{
        return cb(err, dirTree);
    });
}

exports.listObjects = (queryParams, cb)=>{    
    logger.debug(`Requesting for ${queryParams.provider} Bucket: ${bucketname}`);
    var absPath = rootpath + '/' + queryParams.path;
    logger.debug('Requesting for Path: '+absPath);
    if('AWS'===(queryParams.provider).toUpperCase()){
        var params = {
            Bucket: bucketname,
            Prefix : absPath+'/'
          };
        awsBucketReader.listObjects(params, absPath, (err, files)=>{
            return cb(err, files);
        });
    } else if('GOOGLE'===(queryParams.provider).toUpperCase()){
        googleBucketReader.listFiles(bucketname, absPath, (err, files)=>{
            if(err){
                return cb(err);
            } 
            var node = new Node(rootpath, '/'+rootpath, getType(rootpath));
            var startNode = node;
            files.forEach(file => {
                let filePath = trimMetadata(file.name); // java/1/1.1/Document1-1.txt
                var objects = filePath.split('/');      // java/1/1.2/Document1-2.txt
                node = startNode;
                for(var i=0; i< objects.length; i++){
                    let object = objects[i];
                    if(object){
                        var childrens = node.children;
                        var flag=false;
                        if(childrens && childrens.length>0){
                            for(var j=0; j <= i; j++){
                                if(childrens[j] && childrens[j].name==object){
                                    node = childrens[j];
                                    flag=true; break;
                                }
                            }
                        }
                        if(!flag){
                            var tmpNode = new Node(object, getPath(objects, i), getType(object));
                            node.children.push(tmpNode);
                            node = tmpNode;
                        }
                    }
                }
              });
              if(startNode.children[0]){
                  return cb(null, startNode.children[0]);
              }else{
                return cb(null, startNode.children);
              }
        });
    } else{
        return cb(new Error('No Provider defined, Or defined provider is not supported.'));
    }

    
  }
function getPath(objects , index){
    var d = '';
    for(var i=0; i<=index; i++){
        d+='/'+objects[i];
    }
    return d;
}
function getType(pth){
    if(pth.lastIndexOf('.html')!=-1){
        return 'File';
    }else{
        return 'Directory';
    }
}
function trimMetadata(data){
    return data.substr(data.indexOf(rootpath)+rootpath.length+1, data.length);
}

class Node{
    constructor(name, path, type, size){
        this.path = path;
        this.name = name;
        this.children = [];
        this.size = size;
        this.type =type;
    }
}