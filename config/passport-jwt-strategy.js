const passport=require('passport');

const JWTStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user')


//for encryption
let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts,function(jwtPayload,done){

    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("error in finding from jwt");
            return;
        }
        if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    })

}))