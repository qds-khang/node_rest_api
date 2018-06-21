var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var router = express.Router();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Setup database: MongoDB
require('core/services/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
  	message: 'Express APIs'
  });
});
app.use('/', router);

module.exports = app;
