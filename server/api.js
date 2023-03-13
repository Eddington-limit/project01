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
const Story = require("./models/story");
const Comment = require("./models/comment");
const Message = require("./models/message");

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
router.post("/story",(req,res) => {
    const newStory = new Story({
      creator_id: req.user._id,
      creator_name: req.user.name,
      content: req.body.content,
    });
    newStory.save().then((story) => res.send(story));
})

router.get("/chat", (req, res) => {
  Message.find(req.query).then((messages) => res.send(messages));
});

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
  res.send({user_name:'test user', description:'I am a robot'})//need database
});

router.get("/activeUsers", (req, res) => {
  User.find(req.query.userId).then((user)=>{res.send({chatted_with: user.chatted_with})})
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
