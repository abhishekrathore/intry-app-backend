(function () {
    'use strict';
    var mongoose = require("mongoose"), // Require mongoose files
        EmploymentSchema = require("../Schema/EmploymentSchema"), // Require Employment Schema file
        Employment = mongoose.model('Employment', EmploymentSchema);
    module.exports = Employment; // Export Employment Model
})();