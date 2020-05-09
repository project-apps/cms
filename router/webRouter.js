const express = require('express'),
    router = new express.Router(),
    metadataController = require('../controller/metadataController.js'),
    fileController = require('../controller/fileController.js'),
    healthcheck = require('../controller/healthcheck.js');

    router.route('/healthCheckConnections').get(healthcheck.get);
    router.route('/home').get(healthcheck.home);
    router.route('/er').get(healthcheck.err);
    router.route('/dir/metadata').get(metadataController.getDirectoryMetadata);
    router.route('/dir/file').get(fileController.readFileFromDirectory);
    router.route('/bucket/metadata').get(metadataController.getBucketMetadata);
    router.route('/bucket/file').get(fileController.readFileFromBucket);
    
    module.exports = router;
