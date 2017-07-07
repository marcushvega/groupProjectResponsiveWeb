var express = require('express');
var router = express.Router();
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/job_website';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Jobs =  mongoose.Schema({
    companyName: {type: String,required: true },
    jobDesc: {type: String},
    openings: {type: Number},
    employmentType: {type: String},
    skills: {type: Array},
    certs: {type: String},
    startDate: {type: String},
    drugTest: {type: String}
}
);

/* GET jobs listing. */
router.get('/jobs', function(req, res, next) {
    console.log('HI!');
    window.alert("hey oh ~");
    res.json(jobs);
    Jobs.find().then(function(err,Jobs){
    if (err){
        console.log(err + Jobs + "I AM HERE");
    }
     res.json(Jobs);
    })
});
router.post('/jobs', function(req, res, next) {
  //res.json(users);
    var job = new Jobs(req.body.job);
    job.save().then(function(err,jobs){
    if (err){
        console.log(err);
    }
     res.json(jobs);
    })
});

module.exports = router;
