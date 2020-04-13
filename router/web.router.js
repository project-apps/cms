const express = require('express'),
    router = new express.Router(),

    indexController = require('../controller/index.controller.js'),
    healthcheck = require('../controller/healthcheck.js');

    router.route('/healthCheckConnections').get(healthcheck.get);
    router.route('/home').get(healthcheck.home);
    router.route('/er').get(healthcheck.err);
    router.route('/header/:header').get(indexController.get);
    router.route('/filePath/:filePath').get(indexController.getFile);
    module.exports = router;
