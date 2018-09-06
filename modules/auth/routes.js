"use strict";

var express = require('express');
var router = express.Router();
var authController = require('./controllers');



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