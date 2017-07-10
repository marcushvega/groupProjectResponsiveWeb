var mongoose = require('mongoose');

//Create a model of the schema

module.exports = mongoose.model('jobs', {

    companyName: {type: String,required: true },

    jobDesc: {type: String},

    openings: {type: Number},

    employmentType: {type: String},

    skills: {type: Array},

    certs: {type: String},

    startDate: {type: String},

    drugTest: {type: String}

});