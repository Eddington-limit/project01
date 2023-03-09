/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");



router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/stories",(req,res) => {
  res.send([{creator_id:0,//dummy data
    creator_name:'test user',
    _id:0,
    content:'this is a test post',
    num_of_likes:2,
    num_of_comments:99,
    liked_by:[0]},//userid of users that like this post
    {_id:1, 
    creator_name:'测试用户', 
    creator_id:1, 
    content:'这是一条测试帖子',
    num_of_likes:99,
    num_of_comments:2,
    liked_by:[1]}])
}
)

router.get("/profile",(req,res) => {
  res.send({user_name:req.query.userId})//need database
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
