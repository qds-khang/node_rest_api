"use strict";

require('core/services/dotenv');
// Setup database: MongoDB
require('core/services/database');

var chai = require('chai');
var assert = chai.assert;
var userModel = require('modules/user/model');
var log = require('core/services/log');
var mongoose = require('mongoose');



describe('Test user model', function() {
    var newUserData = {
        email: 'test@test.com',
        password: 'test',
        name: 'Test'
    };
    
    before(function(done) {
        // runs before all tests in this block
        this.timeout(10000); // set timeout for async function
        var newUser = new userModel(newUserData);
        
        newUser.save(function(error, user) {
            if(error) log.error(error);
            return done();
        });
    });
    
    after(function(done) {
        // runs after all tests in this block
        this.timeout(10000); // set timeout for async function
        
        userModel.deleteMany({ email: /\@test\.com$/i }, function (err) {
            if (err) log.error(err);

            mongoose.connection.close();

            return done();
        });
    });

    it('get user and check password', function(done) {
        this.timeout(10000); // set timeout for async function

        userModel.findOne({ email: newUserData.email }, function(error, user) {
            assert.isNull(error);

            user.comparePassword(newUserData.password, function(err, is_match) {
                assert.isTrue(is_match);
                return done();
            });
        });
    });
});