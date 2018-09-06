"use strict";

var routes = require('./routes');
require('./passport'); // load passport configurations



module.exports = {
	route_path: '/auth',
	routes: routes
};