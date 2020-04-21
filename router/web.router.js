const express = require('express'),
    router = new express.Router(),

    indexController = require('../controller/index.controller.js'),
    healthcheck = require('../controller/healthcheck.js');

    router.route('/healthCheckConnections').get(healthcheck.get);
    router.route('/home').get(healthcheck.home);
    router.route('/er').get(healthcheck.err);
    router.route('/index').get(indexController.index);
    router.route('/file').get(indexController.file);
    module.exports = router;
