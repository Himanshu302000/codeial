const express=require('express');

const router = express.Router();

const homeController= require('../controller/home_controller');


console.log('router loaded')  //to check if the router is loaded
router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'))


router.use('/api',require('./api'))
module.exports=router;