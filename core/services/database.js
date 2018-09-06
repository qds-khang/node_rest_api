"use strict";

var mongoose = require('mongoose');

var log = require('core/services/log');
var env = require('core/services/env');



// Setup database: MongoDB
mongoose.connect(env.MONGO_URL, function (err) {
	if (err) {
		log.error('Mongo DB connection is failed. ' + err);
	} else {
		log.info('Mongo DB connection is succeeded.');
	}
});