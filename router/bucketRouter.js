const express = require('express'),
    metadataController = require('../controller/metadataController.js'),
    fileController = require('../controller/fileController.js'),
    healthcheck = require('../controller/healthcheck.js');
const router = new express.Router();
router.route('/healthCheckConnections').get(healthcheck.get);
router.route('/home').get(healthcheck.home);
router.route('/er').get(healthcheck.err);
router.route('/metadata').get(metadataController.listObjects);
router.route('/file').get(fileController.getObject);

module.exports = router;
