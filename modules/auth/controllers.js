var Async = require('async');
var User = require('modules/user/model');
var response = require('core/services/response');
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
	}
};