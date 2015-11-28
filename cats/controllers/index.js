'use strict';

var IndexModel = require('../models/index');
var passport = require('../lib/auth');

// https://www.commcarehq.org/a/swb-opphack/api/v0.4/web-user/


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', passport.authenticate('basic'), function (req, res) {

        res.render('index', model);

    });

};
