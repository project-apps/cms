'use strict'
const {Storage} = require('@google-cloud/storage');
var storage = new Storage({
  projectId: 'hybrid-chassis-274213',
  keyFilename: 'C:\\Users\\Admin\\repo\\project-apps\\cms\\hybrid-chassis-274213-73ab784019ab.json'
});
async function listFiles(bucketName, path, cb){
  try{
    const config ={
     // autoPaginate: false,
      prefix: path+'/'
    };
    var bucket = storage.bucket(bucketName);
    const [files] =  await bucket.getFiles(config);
    return cb(null, files);
  }catch(e){
    return cb(e, null);
  }
}
async function readFile(bucketName, path, cb){
  try{
    var archivo =  storage.bucket(bucketName).file('staticContents/java/1/1.1/Document-1-1.txt').createReadStream();
    console.log('Concat Data');
    var  buf = '';
    archivo.on('data', function(d) {
      buf += d;
    }).on('end', function() {
      console.log(buf);
      console.log("Reading of file end.");
      return cb(null, buf);
    });     
  }catch(e){
    return cb(e, null);
  }
}


async function createBucket(bucketName) {
    // Creates a new bucket in the Asia region with the coldline default storage
    // class. Leave the second argument blank for default settings.
    //
    // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes
    const [bucket] = await storage.createBucket(bucketName, {
      location: 'ASIA',
      storageClass: 'COLDLINE',
    });

    console.log(`Bucket ${bucket.name} created.`);
  }

  
async function getBucket(path, cb){
    try{
        const [bucket] =  await storage.getBuckets();
        return cb(null, bucket);
    }catch(e){
        return cb(e);
    }
}
exports.readFile = readFile;
exports.listFiles= listFiles;