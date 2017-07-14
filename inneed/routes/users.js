var express = require('express');

var router = express.Router();

var Users = require('../models/users.js');

/* GET users listing. */

router.get('/', function(req, res, next) {
    Users.find(function(err,Users){

    if (err){
        console.log(err);
    }

     res.json(Users);

    });

});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var user = new Users(req.body.user)

    user.save(function(err,Users){

    if (err){

        console.log(err);

    }

     res.json(Users);

    })

});

router.post('/', function(req, res, next) {

  //res.json(users);

    var user = new Users(req.body.user);

    user.save().then(function(err,users){

    if (err){

        console.log(err);

    }

     res.json(users);

    })

});

module.exports = router;