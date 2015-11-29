'use strict';

var passport = require('../../lib/auth'),
    async = require('async'),
    _ = require('lodash'),
    db = require('../../models/db'),
    fields = "username sensorDeviceId description completedOn status karma";

module.exports = function (router) {

    router.get('/', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            activities: function (next) {
                db.Activity.find({ status: 'Pending' }, fields, next);
            },
            message: function (next) {
                next(null, req.query.message);
            }
        }, function (e, data) {
            res.render('admin', data);
        });
    });

    router.get('/history', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            activities: function (next) {
                db.Activity.find({ status: 'Completed' }, fields, next);
            }
        }, function (e, data) {
            res.render('history', data);
        });
    });

    router.get('/activities/:id/approve', passport.authenticate('basic'), function (req, res, next) {
        db.Activity.findById(req.params.id, function (err, doc) {
            if (err) {
                return next(err);
            }
            doc.status = 'Completed';
            doc.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/admin?message=Successfully Approved');
            });
        });
    });

};
