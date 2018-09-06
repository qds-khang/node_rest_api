"use strict";

require('core/services/dotenv');

var chai = require('chai');
var assert = chai.assert;
var log = require('core/services/log');
var app = require('core/app');
var mongoose = require('mongoose');
var supertest = require('supertest');
var userModel = require('modules/user/model');



describe('Test /auth routes', function() {
    var access_token;

    before(function() {
        // runs before all tests in this block
    });
    
    after(function(done) {
        // runs after all tests in this block
        this.timeout(10000); // set timeout for async function
        
        userModel.deleteMany({ email: /\@test\.com$/i }, function (err) {
            if (err) log.error(err);
            
            mongoose.connection.close(function() {
                log.info('Mongo is closed.');
                return done();
            });
        });
    });
    
    describe('Registration', function() {
        var new_user = {
            email: 'test@test.com',
            password: 'test',
            name: 'Test'
        };

        it('missing fields', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/register/')
                .end(function(err, res) {
                    assert.equal(res.statusCode, 400);
                    return done();
                });
        });

        it('new user', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/register/')
                .send(new_user)
                .end(function(err, res) {
                    assert.equal(res.statusCode, 200);
                    return done();
                });
        });

        it('new user - email already exist', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/register/')
                .send(new_user)
                .end(function(err, res) {
                    assert.equal(res.statusCode, 400);
                    return done();
                });
        });
    });

    describe('Login', function() {
        var new_user = {
            email: 'test@test.com',
            password: 'test',
            name: 'Test'
        };

        it('missing fields', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/login/')
                .end(function(err, res) {
                    assert.equal(res.statusCode, 400);
                    return done();
                });
        });

        it('wrong info', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/login/')
                .send({
                    email: new_user.email,
                    password: 'wrongpassword'
                })
                .end(function(err, res) {
                    assert.equal(res.statusCode, 400);
                    return done();
                });
        });

        it('succeeded', function(done) {
            this.timeout(10000); // set timeout for async function

            supertest(app)
                .post('/api/auth/login/')
                .send({
                    email: new_user.email,
                    password: new_user.password
                })
                .end(function(err, res) {
                    access_token = res.body.data.accessToken;
                    assert.equal(res.statusCode, 200);
                    return done();
                });
        });
    });

    describe('Profile', function() {
        it('wrong token', function(done) {
            this.timeout(10000); // set timeout for async function
            var bearer = 'bearer wrongtoken';

            supertest(app)
                .get('/api/auth/profile/')
                .set('Authorization', bearer)
                .end(function(err, res) {
                    assert.equal(res.statusCode, 401);
                    return done();
                });
        });

        it('get profile', function(done) {
            this.timeout(10000); // set timeout for async function
            var bearer = 'bearer ' + access_token;

            supertest(app)
                .get('/api/auth/profile/')
                .set('Authorization', bearer)
                .end(function(err, res) {
                    assert.equal(res.statusCode, 200);
                    return done();
                });
        });
    });

    describe('Server error', function() {
        it('not found', function(done) {
            this.timeout(10000); // set timeout for async function
            var bearer = 'bearer wrongtoken';

            supertest(app)
                .get('/auth/')
                .end(function(err, res) {
                    assert.equal(res.statusCode, 404);
                    return done();
                });
        });
    });
});