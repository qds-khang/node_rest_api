var express = require('express');
var router = express.Router();
var authController = require('./controllers');



/* POST */
router.post('/login', authController.login);

/* POST */
router.post('/register', authController.register);



module.exports = router;