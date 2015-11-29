'use strict';

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cats');

var Activity = mongoose.model('Activity', {
    instanceID: { type: String, index: { unique: true }, required: true },
	username: String,
	sensorDeviceId: String,
	description: String,
	completedOn: String,
	location: String,
	status: { type: String, enum: ['Pending', 'Completed'] },
	karma: Number,
	details: Object
});

module.exports.save = function (obj, callback) {
    obj.save(callback);
};

module.exports.Activity = Activity;
