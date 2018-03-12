(function () {
    'use strict';
    var mongoose = require("mongoose"),
        bcrypt = require('bcrypt'),
        Schema = mongoose.Schema,
        // Make dummy schema by mogoose for a user colleaction in data base
        EmploymentSchema = mongoose.Schema({
            user_id: {
                type: Schema.Types.ObjectId,
                default: null,
                ref: 'User'
            },
            job_title: {
                type: String
            },
            company_name: {
                type: String,
                default: ''
            },
            joning_date: {
                type: Date
            },
            leaving_date: {
                type: Date
            },
            description: {
                type: String,
                default: ''
            },
            employment_type: {
                type: String,
                default: 'full time'
            },
            status: {
                type: String,
                default: 'active',
                enum: ['active', 'inactive'],
            },
            level_index: {
                type: Number,
            }
        }, {
                timestamps: true
            });
    // Export User Schema
    module.exports = EmploymentSchema;
})();