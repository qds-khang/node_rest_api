var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');



var saltRounds = 12;
var UserSchema = new Schema({
    // Add the index: true options to email to optimize queries that use these fields
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    avatar_url: String,
    active: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    social_auth: {
        facebook: {
            id: String,
            name: String, // displayName
            gender: String, // male | female
            email: String,
            avatar_url: String,
            token: String
        },
        google: {
            id: String,
            name: String, // displayName
            gender: String, // male | female
            email: String,
            avatar_url: String,
            token: String
        },
        twitter: {
            id: String,
            name: String, // displayName
            gender: String, // male | female
            email: String,
            avatar_url: String,
            token: String
        }
    }
}, {
    // The {timestamps: true} option creates a createdAt and updatedAt field 
    // on our models that contain timestamps which will get automatically updated 
    // when our model changes.
    timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            if (err) new Error('Error to hash the password.');

            // Store hash in your password DB.
            user.password = (user.password == '') ? user.password : hash;
            next();
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(password, callback) {
    var user = this;

    bcrypt.compare(password, user.password, function(err, res) {
        return callback(err, res);
    });
};

module.exports = mongoose.model('User', UserSchema);