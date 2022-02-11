const express = require('express');

const router = express.Router();

const postsCont=require('../../../controller/api/v1/posts_api');

router.use('/',postsCont.index);

module.exports=router;