const express=require('express');

const cookieParser=require('cookie-parser')

const expressLayouts=require('express-ejs-layouts');
const router=require('./routes/index');
const path=require('path');
const db=require('./config/mongoose')
//used for session cookie
const session=require('express-session');
const passport=require('passport')
const passporLocal=require('./config/passport-local-strategy')

const port=8000;
const app=express();
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(expressLayouts);
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up the view enjine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: 'codeial',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',router);


app.listen(port,function(err){
    if(err)
    {
        console.log(`error in starting server on ${port}`);
        return;
    }
    console.log(`server is running on port ${port}`);
})