// config/passport.js

// load ALL THE THINGS we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/users.js');


// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStrategy))
    // code for signup (use('local-signup', new LocalStrategy))

    // =============================================
    // GOOGLE ======================================
    // =============================================
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    
    function(token, refreshToken, profile, done){

        // make the code asynchronous
        // User.findOne will not fire until we have all our data back from Google
        process.nextTick(function(){

            console.log('google-auth');
            //try to find the user based on their Google ID
            User.findOne({'googleId': profile.id}, function(err, user){
                if (err) {
                    return done(err);
                }
                if (user) {

                    console.log(user);
                    // if a user is found, log user in
                    return done(null, user);
                }
                else {
                    console.log('user does not exits');
                // /*
                    // if user is not in our database, create a new user
                    var newUser = new User();

                    // set all of the releveant information
                    newUser.googleId       = profile.id;
                    newUser.token    = profile.token;
                    newUser.name     = profile.displayName;
                    newUser.email    = profile.emails[0].value;

                    console.log(newUser);
                    //save the user
                    newUser.save(function(err){
                        if (err){
                            throw err;
                        }
                        return done(err);
                    }); 
                // */
                }
            });
        });
    }
    ));
}