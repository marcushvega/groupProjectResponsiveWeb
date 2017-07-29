// config/auth.js

//expose our config directly to our application using module.exports

module.exports = {
    'googleAuth': {
        'clientID'      : '944725388617-kupkm733c4l3jh10ce64l54kq9t1qvdl.apps.googleusercontent.com',   // Your app ID
        'clientSecret'  : 'gm6GB6r1QHunMbv_qidxZX9o', // Your app secret
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'  //Your callback route
    }
}


// find data
// create json object
// post json object to db
