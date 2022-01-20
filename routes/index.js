const express=require('express');

const router = express.Router();

const homeController= require('../controller/home_controller');


console.log('router loaded')  //to check if the router is loaded
router.get('/',homeController.home)
module.exports=router;