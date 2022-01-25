const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Codeal');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

//check if it is successfully connected
db.once('open',function(){
    console.log('sucessfully connected to the database');
})

module.exports=db;