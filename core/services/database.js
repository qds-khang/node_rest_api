"use strict";

var mongoose = require('mongoose');

var log = require('core/services/log');
var env = require('core/services/env');



// Setup database: MongoDB
if(env.TRAVIS != true) {
	db_connection(env.MONGO_URL);
} else {
	db_connection('mongodb://travis:test@localhost:27017/mydb_test');
}

function db_connection(db_url) {
	mongoose.connect(db_url, function (err) {
		if (err) {
			log.error('Mongo DB connection is failed. ' + err);
		} else {
			log.info('Mongo DB connection is succeeded.');
		}
	});
}