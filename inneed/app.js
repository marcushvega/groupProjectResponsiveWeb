// test comment

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var port  = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/job_website');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/bower_components'));

var jobs = require('./routes/jobs.js')
app.use('/jobs',jobs);

var users = require('./routes/users.js')
app.use('/users',users);

app.get('/',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/homepage.html'));

})

app.listen(port);
console.log(`running on ${port}`);
