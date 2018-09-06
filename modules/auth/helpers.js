"use strict";

var Jwt = require('jsonwebtoken');
var env = require('core/services/env');



module.exports = {
    getAccessToken: function(user) {
        console.log(env);
        var token = Jwt.sign({
                user_id: user.id,
            },
            env.SITE_SECRET_KEY, {
                expiresIn: 60 * 60 // in second => 1 hour
            }
        );

        return token;
    },

    getRefreshToken: function(user) {
        var token = Jwt.sign({
                user_id: user.id
            },
            env.SITE_SECRET_KEY, {
                expiresIn: 60 * 60 * 24 // in second => 24 hour
            }
        );

        return token;
    }
};