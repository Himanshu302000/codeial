const req = require('express/lib/request');
const passport=require('passport');
const LOCALSTRATEGY=require('passport-local').Strategy;
const User=require('../models/user')

//authentication using passport
passport.use(new LOCALSTRATEGY({
    usernameField: 'email',
    passReqToCallback:true
},
function(req,email,password,done){
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding the user -->passport");
            req.flash('error','error')
            return done(err);
        }
        if(!user||user.password!=password){
            console.log("invalid username password");
           req.flash('error','Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    })
}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in the cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("error in finding the user -->passport")
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is sign in then pass on the request to the next function (controller actions)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not sign in return 
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just sending to the locals fir views
        res.locals.user=req.user
    }
    next();
}
module.exports=passport;