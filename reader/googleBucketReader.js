'use strict'
const {Storage} = require('@google-cloud/storage');
var storage = new Storage({
  projectId: 'hybrid-chassis-274213',
  keyFilename: './hybrid-chassis-274213-73ab784019ab.json'
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
    return cb(e);
  }
}
async function readFile(bucketName, path, cb){
  let flag = false;
    const stream =  storage.bucket(bucketName).file(path).createReadStream();  
    var  buf = '';
    await stream.on('data',(data)=> {
      buf += data;
    }).on('end', async ()=> {
      return cb(null, buf);
    }).on('error', () => {
     return cb(new Error('Failed to get file'));
    });  
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
