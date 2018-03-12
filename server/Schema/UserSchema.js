(function () {
    'use strict';
    var mongoose = require("mongoose"),
        bcrypt = require('bcrypt'),
        Schema = mongoose.Schema,
        // Make dummy schema by mogoose for a user colleaction in data base
        UserSchema = mongoose.Schema({
            firstname: {
                type: String,
                default: ''
            },
            lastname: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                unique: [true, 'This email already registred.'],
                required: [true, 'Email Address is Require'],
            },
            password: {
                type: String,
                required: [true, 'Password is Require'],
            },
            provider: {
                type: String,
                default: 'local'
            },
            profile_image: {
                type: String,
                default: null
            },
            last_login: {
                type: Date,
                default: null
            },
            email_valid: {
                type: Boolean,
                default: false
            },
            google_id: {
                type: String,
                default: null
            },
            status: {
                type: String,
                default: 'active',
                enum: ['active', 'inactive', 'delete'],
            },
            table_name: {
                type: String,
                default: 'UserTable',
            },
            reset_password_flag: {
                type: Boolean,
                default: false
            },
            user_role: {
                type: String,
                default: 'user',
                enum: ['user', 'admin', 'super_admin'],
            }
        }, {
                timestamps: true
            });
    UserSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    UserSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    UserSchema.methods.validEmail = function (password) {
        return this.email_valid;
    }
    UserSchema.methods.isActive = function () {
        return this.status === 'active';
    }
    // Export User Schema
    module.exports = UserSchema;
})();