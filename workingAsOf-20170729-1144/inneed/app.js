// // test comment

// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var app = express();
// var port  = process.env.PORT || 3002;

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());



// var jobs = require('./routes/jobs.js')
// app.use('/jobs',jobs);

// var users = require('./routes/users.js')
// app.use('/users',users);

// app.use(express.static(__dirname +'/public'));
// app.use(express.static(__dirname + '/bower_components'));
// app.get('/',function(req,res,next){
//   console.log(__dirname)
//   res.sendFile(path.join(__dirname, '/public/homepage.html'));

// })

// app.listen(port);
// console.log(`running on ${port}`);

//==Above this line is the most recent previous code==\\

// // test comment

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var fs = require('fs');
var passport = require('passport');
require('./config/passport.js')(passport);

var app = express();
var port  = process.env.PORT || 3000;
var views = path.join(__dirname, 'views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// May want to put all routes in one .js file
// var allRoutes = require('./routes/allRoutes.js');
// app.use('/routes');

var jobs = require('./routes/jobs.js');
app.use('/jobs',jobs);

var users = require('./routes/users.js');
app.use('/users',users);

var routes = require('./routes/routes.js')

// app.use('/api', routes);

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/models'));
app.get('/',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/homepage.html'));
});


//loads all files in models directory
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('js')) {
    require(__dirname + '/models/' + filename);
  };
});

//sends GET request for all the users in the database
app.get('/users', function(req, res, next){
  //             'users' represents the users.js in ./models
  mongoose.model('users').find(function(err, users){

    if (err){
        res.redirect('/');
    }
    res.send(users);
  });
});

// route for home page
app.get('/',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/homepage.html'));
  
});

// route for login form
// route for processing the login form

// route for signup form
app.get('/sign-up', function(req, res, next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/elements/htmlOnlySignUp.html'));
});
// route for processing the signup form

/*
// route for showing the profile page
app.get('/profile', isLoggedIn, function(req, res){
    res.render(profile.html) {
        user: req.user; // get the user out of session and pass to template
    }
})
*/
// Show profile page
app.get('/profile',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/elements/htmlOnlyProfile.html'));
});

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// facebook routes
// twitter routes

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

