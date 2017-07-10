var express = require('express');

var router = express.Router();

var Jobs = require('../models/jobs.js');

/* GET jobs listing. */

router.get('/', function(req, res, next) {
    Jobs.find(function(err,Jobs){

    if (err){
        console.log(err);
    }

     res.json(Jobs);

    });

});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var job = new Jobs(req.body.job)

    job.save(function(err,Jobs){

    if (err){

        console.log(err);

    }

     res.json(Jobs);

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