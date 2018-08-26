var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

var Jwt = require('jsonwebtoken');
var env = require('core/services/env');
var User = require('modules/user/model');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new Strategy(
    function(token, done) {
        Jwt.verify(token, env.SITE_SECRET_KEY, function (err, decoded) {
            if (err) return done(null, false); // response Unauthorized

            User.findById(decoded.user_id, function (err, user) {
                if (err || !user) return done(null, false); // response Unauthorized

                return done(null, user, {
                    scope: 'all'
                });
            });
        });
    })
);