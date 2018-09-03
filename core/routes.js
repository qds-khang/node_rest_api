"use strict";

var express = require('express');
var router = express.Router();

var fs = require('fs');

var app = require('core/app');
var log = require('core/services/log');
var response = require('core/services/response');



var path = 'modules';

// load routes of the modules
module.exports.init = function(app) {
	fs.readdir(path, function(err, items) {
		if(err) log.error(err);

	    for (var i = 0; i < items.length; i++) {
	    	var module_name = items[i];
	        var load_module = require('modules/' + module_name);
	        var path = load_module.route_path;
	        var routes = load_module.routes;
	        
	        app.use('/api' + path, routes);
		}
		
		// catch 404 error
		app.use(function (req, res) {
			return response.notFound(res);
		});
	});
};