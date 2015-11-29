'use strict';

var passport = require('../lib/auth'),
    async = require('async'),
    gravatar = require('gravatar'),
    _ = require('lodash'),
    db = require('../models/db'),
    fields = "sensorDeviceId description completedOn status karma";

// https://www.commcarehq.org/a/swb-opphack/api/v0.4/web-user/


module.exports = function (router) {

    router.get('/', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            user: function (next) {
                var user = _.extend({}, req.user);
                user.imageUrl = gravatar.url(user.email || user.username, { s: '120' });
                next(null, user);
            },
            activities: function (next) {
                db.Activity.find({ 'details.meta.userID': req.user.id, status: 'Pending' }, fields, next);
            },
            history: function (next) {
                db.Activity.find({ 'details.meta.userID': req.user.id, status: 'Completed' }, fields, next);
            },
            karma: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Completed', 'details.meta.userID': req.user.id }
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            }
        }, function (e, data) {
            res.render('index', data);
        });
    });

};
