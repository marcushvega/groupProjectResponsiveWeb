// test comment

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var port  = process.env.PORT || 3000;
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


// app.use(function(req,res,next){
//   console.log(req);
//   next();
//
// })

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/../bower_components'));


// app.use('/', index);
app.get('*',function(req,res,next){
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '/public/homepage.html'));
  // res.json({msg:'test'})
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
//   console.log(err)
// });

// module.exports = app;
app.listen(port);
console.log(`running on ${port}`);
