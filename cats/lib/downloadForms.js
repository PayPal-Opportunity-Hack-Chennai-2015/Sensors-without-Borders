'use strict';

var request = require('request'),
    _ = require('lodash'),
    async = require('async'),
    db = require('../models/db'),
    options = {
        url: 'https://www.commcarehq.org/a/swb-opphack/api/v0.4/form/',
        auth: {
            user: process.env.COMMCARE_USERNAME,
            pass: process.env.COMMCARE_PASSWORD
        },
        json: true
    };

function buildActivity(data, callback) {
    return new db.Activity({
        instanceID: data.meta.instanceID,
        username: data.meta.username,
        sensorDeviceId: (data.SensorDevice_Id || data.SD_Identification),
        completedOn: (data.current_date || data.Current_Date),
        location: (data.GPS_Location || data.SD_Location),
        description: data['@name'],
        karma: Number(data.Karma_Points || 50) || 50,
        status: 'Pending',
        details: data
    });
}

function getCommCareForms(callback) {
    request.get(options, function response(err, httpResponse, data){
        callback(err, data && _.pluck(data.objects, 'form'));
    });
}

function saveForms(callback) {
    getCommCareForms(function (err, list) {
        async.each(_.map(list, buildActivity), function (activity, next) {
            activity.save(function (e) {
                console.log(activity.id, e ? e.message : 'Downloaded..');
                next();
            });
        }, callback);
    });
}

module.exports.saveForms = saveForms;
module.exports.buildActivity = buildActivity;
module.exports.getCommCareForms = getCommCareForms;

if(require.main === module) {
    saveForms(function () {
        process.exit(0);
    });
}
