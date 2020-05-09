const fs = require('fs'),
dirTree = require('directory-tree');

exports.listDirFilesTree = (dirPath, cb)=>{
    new Promise((resolve, reject)=>{
        if (!fs.existsSync(dirPath)) {
            reject(new Error(`Can't find path: ${dirPath} in dirTree.`))
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
exports.readFile = (filePath, cb)=>{	
    //fs.readFileSync(filePath, 'utf-8');
   existsSync(filePath, (err, file)=>{
      new Promise((resolve, reject)=>{
	if(err){
           reject(err);		
	}
	resolve(file);	
	}).then(file=>{
	   return cb(null, file);		
	}).catch(err=>{
	   return cb(err);	
	});        
    });
}
existsSync = (filePath, cb)=>{
   try {
     if (fs.existsSync(filePath)) {
       return cb(null, filePath); 
     }else{
	    return cb(new Error(`Error in fetching file: ${filePath}`));
	}
   } catch(err) {
    return cb(err);
   }
}
