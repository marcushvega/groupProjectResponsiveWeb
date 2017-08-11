var express = require('express');

var router = express.Router();

var Job = require('../models/jobs.js');

// router.post('/', function(req, res, next) {
//     console.log(req.body);
//     var job = new Jobs(req.body.job);

//     job.save(function(err,job){

//     if (err){

//         console.log(err);

//     }

//      res.json(job);

//     })

// });


// router.delete('/:id', function(req, res, next) {
//     console.log(req.params.id);

//    Jobs.remove({_id:req.params.id},function(err,Jobs){

//     if (err){
//       console.log(err);
//     }
//      res.json(Jobs);

//     })

// });


module.exports = router;
