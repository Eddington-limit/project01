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


router.post("/login", auth.login);
router.post("/register",auth.register);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in(sonething is wrong, check server-socket.js)
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/story",auth.ensureLoggedIn, (req, res) => {
  if (req.body.content.length > 200) {
    res.status(400).send('exceeded 200 words' );
  } else {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });
  newStory.save().then((story) => res.send(story));
  }});

router.get("/user",(req,res)=>{
  User.find({_id:req.query.userId}).then((user)=>{
    res.send(user)
  })
})

router.get("/chat", (req, res) => {
  query = {
    $or: [
      { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
      { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
    ],
  };
  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();
  socketManager.getSocketFromUserID(req.user._id).emit("message", message);
    if (req.user._id !== req.body.recipient._id &&socketManager.getSocketFromUserID(req.body.recipient._id)) {
      socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    }
  }
);

router.get("/stories",(req,res) => {
  Story.find().then((stories)=>res.send(stories))
})

router.get("/profile",(req,res) => {
  User.findOne({_id:req.query.userId}).then((user)=>{
  res.send({user_name:user.name, description:user.description})})
});

router.get("/activeUsers", (req, res) => {
  User.find({_id:{$in: req.user.chatted_with}}).then((users)=>{res.send(users)})
});

router.post("/startChat", (req,res) => {
  const chatted_with = req.session.user.chatted_with.slice()
  const index = chatted_with.indexOf(req.body._id);
  index !== -1?
    chatted_with.splice(index, 1):
    chatted_with.unshift(req.body._id);
  //更新session
  req.session.user.chatted_with=chatted_with;
  //更新数据库
  User.findByIdAndUpdate(
    req.session.user._id,{chatted_with: chatted_with}).then((user)=>{res.send({})})})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
