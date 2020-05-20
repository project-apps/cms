const express = require('express'),
    router = new express.Router(),
    metadataController = require('../controller/metadataController.js'),
    fileController = require('../controller/fileController.js'),
    healthcheck = require('../controller/healthcheck.js');

    router.route('/healthCheckConnections').get(healthcheck.get);
    router.route('/home').get(healthcheck.home);
    router.route('/er').get(healthcheck.err);
    router.route('/metadata').get(metadataController.getDirectoryMetadata);
    router.route('/file').get(fileController.readFileFromDirectory);
    
    module.exports = router;
