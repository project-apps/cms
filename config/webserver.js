const http = require('http'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser')
    bucketRouter = require('../router/bucketRouter.js'),
    dirRouter = require('../router/directoryRouter.js'),
    logger = require('../util/log4js.js');
const port = process.env.HTTP_PORT || process.env.PORT || 3000;
let httpServer;

exports.initialize = ()=>{
  return new Promise((resolve, reject)=>{
        let app = express();
        app.use(cors());        
        app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded
        app.use(bodyParser.json());// parse application/json
        app.use(express.static('views'));
        app.set('view engine', 'ejs');
        app.use('/bucket', bucketRouter);
        app.use('/dir', dirRouter);
        httpServer = http.createServer(app);
        httpServer.timeout = 900000;
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
exports.close= ()=>{
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