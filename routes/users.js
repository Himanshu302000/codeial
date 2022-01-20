const express=require('express');
const res = require('express/lib/response');


const router = express.Router();

const userController=require('../controller/users_controller');

router.get('/profile',userController.profile)
module.exports=router