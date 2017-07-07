var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Jobs =  mongoose.model('Jobs',{
    companyName: {type: String,required: true },
    jobDesc: {type: String},
    openings: {type: Number},
    employmentType: {type: String},
    skills: {type: Array},
    certs: {type: Array},
    startDate: {type: Date},
    drugTest: {type: String}
}
)
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.json(users);
    Jobs.find().then(function(err,jobs){
    if (err){
        console.log(err);
    }
     res.json(jobs);
    })
});
router.post('/', function(req, res, next) {
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
