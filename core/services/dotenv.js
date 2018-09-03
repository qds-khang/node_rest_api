"use strict";

var dotenv = require('dotenv');
var envConfig = dotenv.config();
var log = require('core/services/log');

if (envConfig.error) {
    log.error('Read .env file fail. ' + envConfig.error);
} else {
    log.info('Read .env file success');
}