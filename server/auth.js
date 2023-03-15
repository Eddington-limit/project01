const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");
const bcrypt = require('bcrypt');



//寻找数据库中匹配登录信息用户名的用户，并比对密码是否正确
function verify(login_info) {
  User.findOne({name: login_info.username}).then((existingUser) => {
    if (existingUser&&
      bcrypt.compareSync(login_info.password,existingUser.hashed_password)) 
    {return existingUser}})
}


function register(req,res) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  // Hash the password with the salt
  const hashed_password = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.username,
      _id: User.countDocuments({})+1,
      hashed_password:hashed_password
    });
    return newUser.save();
  }

function login(req, res) {
  verify(req.body)//body is an object containing username and password
    .then((user) => {
      if (!user) {alert('用户名或密码不正确！')}
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
