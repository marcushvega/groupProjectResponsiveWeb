// routes/routes.js

module.exports = function(app, passport){
    
    // route for home page
    app.get('/', function(req, res, next){
        res.render(homepage.html)
    });

    // route for login page
    // route for processing the login form
    // route for the signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res, next){
        res.render(profile.html, {
            user: req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res, next){
        req.logout();
        res.redirect('/');
    });

    // facebook routes
    // twitter routes
    // =================================================
    // GOOGLE ROUTES ===================================
    // =================================================
    // send to google to do the authentication
    // profile gets use their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
    
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }

    // if not authenticated, return user to homepage
    res.redirect('/');
};