var Async = require('async');
var Validator = require('validator');
var User = require('modules/user/model');
var response = require('core/services/response');
var log = require('core/services/log');
var helpers = require('./helpers');



module.exports = {
	// api login
	login: function(req, res, next) {
		var email = req.body.email;
		var password = req.body.password;

		Async.waterfall([
			// get user by email
			function(callback) {
				User.findOne({ email: email }, function(error, user) {
					if (error) {
                        return callback(error);
                    }

					// user is not exist
					if (!user) {
                        var error = {
                            statusCode: 400,
                            data: ['This email is not exist.']
                        };
						return callback(error);
					}

					return callback(null, user);
				});
			},
			// check password
			function(user, callback) {
				user.comparePassword(password, function(err, is_match) {
					if (error) {
                        return callback(error);
                    }

					// password incorrect
					if (!is_match) {
                        var error = {
                            statusCode: 400,
                            data: ['Incorrect password.']
                        };
						return callback(error);
					}
					// if user is found and password is correct > create a token
					var accessToken = helpers.getAccessToken(user);
					var refreshToken = helpers.getRefreshToken(user);

                    // return the information including token as JSON
                    var data = {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    };
					return callback(null, data);
				});
			}
		], function(error, data) {
			if (error) {
				return response.errorHandle(res, error);
            }

			return response.success(res, data);
		});
	},

	// login validation
	loginValidation: function(req, res, next) {
		var email = req.body.email || '';
		var password = req.body.password || '';
		var messages = [];

		// validate email
		if (Validator.isEmpty(email)) {
            messages.push('Email is required.');
        } else if (!Validator.isEmail(email)) {
            messages.push('Email invalid.');
        }
		
		// validate password
        if (Validator.isEmpty(password)) {
            messages.push('Password is required.');
		}
		
		// return reponse if there is error
		if(messages.length > 0) {
			var error = {
				statusCode: 400,
				data: messages
			};

			return response.errorHandle(res, error);
		} else { 
			// go to next middleware
			return next();
		}
	},

	// api register
	register: function(req, res, next) {
		var email = req.body.email;
		var password = req.body.password;
		var name = req.body.name;

		Async.waterfall([
			// get user by email
			function(callback) {
				User.findOne({ email: email }, function(error, user) {
					if (error) {
						log.error(error);
                        return callback(error);
                    }

					if (user) {
                        var error = {
                            statusCode: 400,
                            data: ['Email already exists.']
                        };
						return callback(error);
					}

					return callback(null);
				});
			},
			// create new user
			function(callback) {
				var newUser = new User({
					email: email,
					password: password,
					name: name
				});

				newUser.save(function(error, user) {
					if (error) {
						log.error(error);
                        return callback(error);
                    }

					return callback(null, ['You have registered sucessful.']);
				});
			}
		], function(error, data) {
			if (error) {
				return response.errorHandle(res, error);
            }

			return response.success(res, data);
		});
	},

	// register validation
	registerValidation: function(req, res, next) {
		var email = req.body.email || '';
		var password = req.body.password || '';
		var name = req.body.name || '';
		var messages = [];

		// validate email
		if (Validator.isEmpty(email)) {
            messages.push('Email is required.');
        } else if (!Validator.isEmail(email)) {
            messages.push('Email invalid.');
        }
		
		// validate password
        if (Validator.isEmpty(password)) {
            messages.push('Password is required.');
		}

		// validate name
		if (Validator.isEmpty(name)) {
			messages.push('Name is required.');
		}
		
		// return reponse if there is error
		console.log(messages);
		if(messages.length > 0) {
			var error = {
				statusCode: 400,
				data: messages
			};

			return response.errorHandle(res, error);
		} else {
			return next();
		}
	},
};