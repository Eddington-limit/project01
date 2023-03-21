const User = require("./models/user");
const socketManager = require("./server-socket");
const bcrypt = require('bcrypt');



//寻找数据库中匹配登录信息用户名的用户，并比对密码是否正确
function verify(login_info) {
  return User.findOne({name: login_info.username}).then((existingUser) => {
    if (existingUser&&
      bcrypt.compareSync(login_info.password,existingUser.hashed_password)) 
    {return existingUser}
    else {
      throw new Error('Invalid username or password')}})}


async function register(req,res) {
  req.session.user = null
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashed_password = bcrypt.hashSync(req.body.password, salt);

  const existingUser = await User.findOne({ name: req.body.username });
  if (existingUser) {
    return res.status(400).send({ message: "Username already exists" });
  }

  const count = await User.countDocuments({});
  const newUser = new User({
    name: req.body.username,
    _id: count+1,
    hashed_password: hashed_password});
  newUser.save()
    .then((savedUser) => {res.send(savedUser)})
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Failed to register new user" });
  });
  }

function login(req, res) {
  verify(req.body)//body is an object containing username and password
    .then((user) => {
      if (!user) {res.send({})};
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  const userSocket = socketManager.getSocketFromUserID(req.user._id);
  if (userSocket) {
    // delete user's socket if they logged out
    socketManager.removeUser(req.user, userSocket);
  }
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
  register
};
