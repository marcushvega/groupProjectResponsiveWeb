var express = require('express');

var router = express.Router();

<<<<<<< 68e1ace7d8db69c094bc4b8a752256c8e41d1826
=======
var router = express.Router();

>>>>>>> correced job search layout and connected signup form
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