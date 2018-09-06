"use strict";

var express = require('express');
var router = express.Router();



/* GET */
router.get('/', function(req, res, next) {
	res.json({
		message: 'Get users'
	});
});



module.exports = router;