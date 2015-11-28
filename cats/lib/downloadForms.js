'use strict';

var request = require('request'),
    _ = require('lodash'),
    db = require('../models/db'),
    options = {
        url: 'https://www.commcarehq.org/a/swb-opphack/api/v0.4/form/',
        auth: {
            user: process.env.COMMCARE_USERNAME,
            pass: process.env.COMMCARE_PASSWORD
        },
        json: true
    };

function newActivity(data, callback) {
    return new db.Activity({
        instanceID: data.meta.instanceID,
        username: data.meta.username,
        sensorDeviceId: data.SensorDevice_Id,
        completedOn: data.current_date,
        location: data.GPS_Location,
        description: data['@name'],
        status: 'Pending',
        details: data
    });
}

function getCommCareForms(callback) {
    request.get(options, function response(err, httpResponse, data){
        callback(err, data && _.pluck(data.objects, 'form'));
    });
}

module.exports.newActivity = newActivity;
module.exports.getCommCareForms = getCommCareForms;
