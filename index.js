const express=require('express');
const router=require('./routes/index');

const port=8000;
const app=express();
app.use('/',router);


app.listen(port,function(err){
    if(err)
    {
        console.log(`error in starting server on ${port}`);
        return;
    }
    console.log(`server is running on port ${port}`);
})