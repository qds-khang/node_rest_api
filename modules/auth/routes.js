var express = require('express');
var passport = require('passport');
var router = express.Router();
var authController = require('./controllers');



var app = require('core/app');
// Setup passport
app.use(passport.initialize());
app.use(passport.session());
require('./passport');



/* POST */
router.post('/login', authController.loginValidation, authController.login);

/* POST */
router.post('/register', authController.registerValidation, authController.register);

/* GET */
// request with headers = {
//     Authorization: bearer accessToken
// }
router.get('/profile', authController.bearerAuthenticated, authController.profile);


module.exports = router;