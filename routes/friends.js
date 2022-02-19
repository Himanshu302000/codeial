const express = require("express");
const router = express.Router();
const passport = require("passport");
const friends_Controller = require('../controller/friendsController')

router.get("/add-friend" , passport.checkAuthentication ,friends_Controller.addFriend);
module.exports = router;