var mongoose = require('mongoose');

var log = require('core/services/log');
var env = require('core/services/env');



// Setup database: MongoDB
mongoose.connect(env.MONGO_URL, function (err) {
	if (err) {
		log.error('Mongo DB connect fail. ' + err);
	} else {
		log.info('Mongo DB connect success');
	}
});