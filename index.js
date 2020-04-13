const webServer = require('./config/webserver.js'),
      logger = require('./util/log4js.js');
    
    async function startup(){
    try{
        logger.debug('Starting application.');
            await webServer.initialize();
        }catch(err){
            logger.error(err);
            process.exit(1);
        }
    }
    startup();
    
    async function shutdown(e){
        let err = e;
        try{
            await webServer.close();
        }catch(e){
            logger.error(e);
            err = err || e;
        }
    }
    process.on('uncaughtException', err=>{
        logger.error(`UncaughtException:\n${err}`);
        //shutdown(err);
    });
    