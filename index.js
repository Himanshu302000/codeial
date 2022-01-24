const express=require('express');

const expressLayouts=require('express-ejs-layouts');
const router=require('./routes/index');
const path=require('path');

const port=8000;
const app=express();
app.use(expressLayouts)

//setting up the view enjine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/',router);


app.listen(port,function(err){
    if(err)
    {
        console.log(`error in starting server on ${port}`);
        return;
    }
    console.log(`server is running on port ${port}`);
})