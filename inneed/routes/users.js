var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var users =  [
    "stupid",
    "phil",
    "ambyr",
    "james"
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
  //  users.FindAll().then(function(users){
 //    res.json(users);
   // })
});

module.exports = router;
