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

// enables use of template engine ejs
app.set('view engine', 'ejs');

//REQUIRED for mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var hasStorage = (function() {
	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		return true;
	} catch (exception) {
		return false;
	}
}());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

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
app.get('/newUser', function(req, res, next){
  // var user = {name: req.user.name}
  // console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/signUpPage.html'));
  // res.render(path.join(__dirname, 'welcomeUser.ejs', {user: user}));
});

// REQUIRED for profile page access
// app.get('/profile',function(req,res,next){
//   console.log(__dirname)
//   res.sendFile(path.join(__dirname, '/public/profilePage.html'));
// });

app.get('/profile', isLoggedIn, function(req, res) {
  var user = {name: req.user.name, email: req.user.email};
  res.render('profile.ejs', { user: user });  
  // res.render('/public/profilePage', { user: req.user });
  // res.sendFile(path.join(__dirname, '/public/profilePage.html'), { user: user });
});


//==============================================================
//==============================================================
//==  CRUD stuff for jobs ======================================
//==============================================================
var Job = require('./models/jobs');

//sends GET request for all the jobs in the database
app.get('/jobs', function(req, res, next){
//              'jobs' represents the jobs.js in ./models
  Job.find(function(err, jobs){

    if (err){
        res.redirect('/');
    }
    res.json(jobs);
  });
});

// Sends GET request for ONE job in the database 
//  Finds job based on companyName
app.get('/jobs/:companyName', function(req, res, next){
  console.log("getting one job with companyName " + req.params.companyName);
  Job.findOne({companyName: req.params.companyName}, function(err, job){
    if(err){
      return res.send(err);
    }
    console.log(job);
    res.json(job);
  })
});

// Sends user to page to  submit resume for a job for (companyName)
// 
app.get('/apply',isLoggedIn, function(req, res) {
  console.log("req.user: "+ req.user)
  var user = {name: req.user.name};
  res.render('apply.ejs', { user: user });  

})

// Sends GET request for ONE job in the database
//  Finds job based on _id 
//  Apparently url must be different if more than one Model.findOne exists ?
//  See pattern between this findOne (_id) and the last findOne (companyName) ?
// app.get('/jobsById/:id', function(req, res, next){
//   console.log("getting one job with _id " + req.params.id);
//   Job.findOne({_id: req.params.id}, function(err, user){
//     if(err){
//       return res.send(err);
//     }
//     console.log(user);
//     res.json(user);
//   })
// });

// POST function
// Postman needs to send RAW JSON data
//     OR
// Postman needs to send X-WWW-FORM-URLENCODED data
app.post('/jobs', function(req, res, next) {
    console.log(req.body.job);
    var job = new Job(req.body.job);

    job.save(function(err,job){

    if (err){
        console.log(err);
        return res.send(err);
    }
     res.json(job);
    })

});

// DELETE function
// Deletes by job id
app.delete('/deleteJob/:id', function(req, res, next) {
    console.log(req.params.id);

   Job.remove({_id:req.params.id},function(err,Job){

    if (err){
      console.log(err);
    }
     res.json(Job);

    })

});


//--------------------------------------------\
//-----------PUT function not working---------\
//---------------in progress------------------\
//--------------------------------------------\
// // PUT function for multiple field changes per id
// app.put('/jobs/', function(req, res) {
//   // Job.findById(req.params.id, function(err, doc) {
//   //   if (!err) {
//   //     utils.updateDocument(doc, Job, req.params);
//   //     doc.save();
//   //   }
//   // });

//    Job.findOne({companyName: req.params.companyName}, function (err, job){
//      if (err) {
//         console.log(err);
//         res.send(422,'update failed');
//      } else {
//         //update fields
//         console.log("about to search through fields");
//         for (var field in Job.schema.paths) {
//           console.log("at field " + field);
//            if ((field !== '_id') && (field !== '__v')) {
//              console.log("about to update field " + field);
//              console.log("req.body." + field + " " + " is " + req.body[field]);
//              console.log("job[field] is " + job[field])
//               if (req.body[field] !== undefined) {
//                  job[field] = req.body[field];
//                  console.log("field " + field + " equals " + req.body[field]);
//               }  
//            }  
//         }  
//         job.save();
//      }
//   });
// });



//==============================================================
//==============================================================
//==  CRUD stuff for users =====================================
//==============================================================

var User = require('./models/users');

// sends GET request for all the users in the database
app.get('/users', function(req, res, next){
  var user = {name: req.user.name, email: req.user.email}
  console.log("user: ", req.user._id);
  //             'users' represents the users.js in ./models
  // mongoose.model('users').find(function(err, users){

  //   if (err){
  //       res.redirect('/');
  //   }
    res.json(gid);
  // });
});

// Sends GET request for ONE user in the database
app.get('/users/:id', function(req, res, next){
  console.log("getting one user with id " + req.params.id);
  User.findOne({_id: req.params.id}, function(err, user){
    if(err){
      return res.send(err);
    }
    console.log(user);
    res.json(user);
  })
});

// POST function
// Postman needs to send RAW JSON data
//     OR
// Postman needs to send X-WWW-FORM-URLENCODED data
app.post('/users', function(req, res, next) {
    console.log(req.body.user);
    var user = new User(req.body.user);

    user.save(function(err,user){

    if (err){
        console.log(err);
        return res.send(err);
    }
     res.json(user);
    })

});

// DELETE function
// Deletes by user id
app.delete('/deleteUser/:id', function(req, res, next) {
    console.log(req.params.id);

   User.remove({_id:req.params.id},function(err,Job){

    if (err){
      console.log(err);
    }
     res.json(User);

    })

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
// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    console.log("user has logged out of session");
    res.redirect('/');
});

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
    scope: ['profile', 'email'],
}));

// the callback after google has authenticated the user
app.get('/auth/google/callback', passport.authenticate( 'google', {
        successRedirect: '/profile',
        failureRedirect: '/newUser'
    }), );

// Multiple request handlers to get profile information 
//
// https://stackoverflow.com/questions/20340268/get-request-object-in-passport-strategy-callback

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log("Here is the request: " + req.toString());
        return next();
    }


    // if user is not authenticated in the session,
    //  redirect user to the home page
    res.redirect('/');
}
app.listen(port);
console.log(`running on ${port}`);

module.exports = hasStorage;