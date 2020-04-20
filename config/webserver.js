const http = require('http'),
      express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser')
      webRouter = require('../router/web.router.js'),
      logger = require('../util/log4js.js');
const port = process.env.HTTP_PORT || process.env.PORT || 3000;
let httpServer;

exports.initialize = ()=>{
  return new Promise((resolve, reject)=>{
        let app = express();
        httpServer = http.createServer(app);
        httpServer.timeout = 900000;
	app.use(cors());        
	app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded
        app.use(bodyParser.json())// parse application/json
        app.use(express.static('views'));
        app.set('view engine', 'ejs');
        app.use('/cms', webRouter);
	
        httpServer.listen(port, err=>{
            if(err){
                logger.error(err);
                reject(err);
                return;
            }
            logger.debug(`Web server listning on :${port}`);
            resolve();
        });
    });
}
function close(){
    return new Promise((resolve, reject)=>{
        httpServer.close((err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
}

exports.close = close;
