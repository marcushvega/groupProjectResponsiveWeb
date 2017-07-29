// test comment

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
// var fs = require('fs');
//REQUIRED for oauth
var passport = require('passport');
require('./config/passport.js')(passport);

var app = express();
var port  = process.env.PORT || 3000;
// var views = path.join(__dirname, 'views');

//REQUIRED for mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));

// REQUIRED for oauth
app.use(passport.initialize());
app.use(passport.session());

// REQUIRED for job schema
var jobs = require('./routes/jobs')
app.use('/jobs',jobs);

// REQUIRED for user schema
var users = require('./routes/users')
app.use('/users',users);

// var routes = require('./routes/routes.js')
// app.use('/api', routes);

// REQUIRED for easier path access to polymer components
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/bower_components'));
// app.use(express.static(__dirname + '/models'));


//==============================================================
//==============================================================
//==  Routing for pages ========================================
//==============================================================

// REQUIRED for homepage access
// due to '/', this function will be execute for EVERY request
app.get('/',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/homepage.html'));
});

// REQUIRED for sign-up page access
// route for signup form
app.get('/sign-up', function(req, res, next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/signUpPage.html'));
});

// REQUIRED for profile page access
app.get('/profile',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/elements/htmlOnlyProfile.html'));
});


//==============================================================
//==============================================================
//==  CRUD stuff for jobs ======================================
//==============================================================


//sends GET request for all the jobs in the database
app.get('/jobs', function(req, res, next){
//              'jobs' represents the jobs.js in ./models
  mongoose.model('jobs').find(function(err, jobs){

    if (err){
        res.redirect('/');
    }
    res.send(jobs);
  });
});

//==============================================================
//==============================================================
//==  CRUD stuff for users =====================================
//==============================================================

// sends GET request for all the users in the database
app.get('/users', function(req, res, next){
  //             'users' represents the users.js in ./models
  mongoose.model('users').find(function(err, users){

    if (err){
        res.redirect('/');
    }
    res.send(users);
  });
});

app.post('/users', function(req, res, next){
  //             'users' represents the users.js in ./models
  mongoose.model('users').find(function(err, users){

    if (err){
        res.redirect('/');
    }
    res.send(users);
  });
});

//==Above this line is the most recent previous code==\\

//===========================================================
//===========================================================
//======  These comments are things we may add still ?  =====
//===========================================================

// // May want to put all routes in one .js file
// // var allRoutes = require('./routes/allRoutes.js');
// // app.use('/routes');

//======= UNSURE HOW IT DIFFERS FROM CURRENT ROUTE line 73ish ===
// // route for showing the profile page
// app.get('/profile', isLoggedIn, function(req, res){
//     res.render(profile.html) {
//         user: req.user; // get the user out of session and pass to template
//     }
// })

//======= SEEMS NECESSARY============
// // route for logging out
// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

//======= HIGHLY UNLIKELY=============
// // facebook routes
// // twitter routes

// =================================================
// GOOGLE ROUTES ===================================
// =================================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
app.get('/auth/google/callback', passport.authenticate( 'google', {
        successRedirect: '/profile',
        failureRedirect: '/sign-up'
    }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }

    // if user is not authenticated in the session,
    //  redirect user to the home page
    res.redirect('/');
}
app.listen(port);
console.log(`running on ${port}`);

