const express=require('express');

const cookieParser=require('cookie-parser')
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const router=require('./routes/index');
const path=require('path');
const db=require('./config/mongoose')
//used for session cookie
const session=require('express-session');
const passport=require('passport')
const passporLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session)
const sassMiddleware =require('node-sass-middleware')
const flash=require('connect-flash');
const customMware = require('./config/middleware')

app.use(sassMiddleware({
src:'./assets/scss',
dest:'./assets/css',
debug:true,
outputStyle:'extended',
prefix:'/css'
}));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up the view enjine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
      },
    function(err){
        console.log(err||'connect-mongodb setup ok')
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/',router);



app.listen(port,function(err){
    if(err)
    {
        console.log(`error in starting server on ${port}`);
        return;
    }
    console.log(`server is running on port ${port}`);
})