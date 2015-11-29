'use strict';

var async = require('async'),
    _ = require('lodash'),
    download = require('../lib/downloadForms');

module.exports = function (router) {
    router.post('/hook', function (req, res) {
        download.buildActivity(req.body).save(function (err, activity) {
            console.log(req.body);
            console.log(err);
            console.log(activity);
        });
        res.send("");
    });
};

