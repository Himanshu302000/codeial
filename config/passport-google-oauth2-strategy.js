const passport = require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');


// Tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID: "984761440319-ormg2btffib380j55tbfs0ac8l7hm5bq.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},

function(accessToken,refreshToken,profile,done){
    //find  a user 
    User.findOne({email : profile.emails[0].value}).exec(function(err,user){
        if(err)
        {
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);
        //if user exists in the database then we will return user
        if(user)
        {
            return done(null,user);
        }
        //if user doesnot exist in the database then create user
        else
        {
            User.create({
                name: profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){
                    console.log("error in creating the user ",err)
                    return;
                }
                else
                {
                    return done(null,user);
                }
            })
        }
    })
}

));

module.exports=passport;
