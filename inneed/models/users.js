var mongoose = require('mongoose');

//Create a model of the schema
//var auth..

module.exports = mongoose.model('users', {

    // firstName: {type: String,required: true },

    // lastName: {type: String,required: true},

    googleId: {type: String},

    token: {type: String},

    name: {type: String},

    dateOfBirth: {type: Date},
    
    email: {type: String},

    password: {type: String},

    skills: {type: Object},

    compTrains: {type: Object},
    
    address: {type: String},

    drugTest: {type: String}

});