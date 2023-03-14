const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");
const bcrypt = require('bcrypt');




function verify(login_info) {
  User.findOne({name: login_info.username}).then((existingUser) => {
    if (existingUser&&
      bcrypt.compareSync(login_info.password,existingUser.hashed_password)) 
    {return existingUser}})
}


function CreateUser(login_info) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  // Hash the password with the salt
  const hashedPassword = bcrypt.hashSync(login_info.password, salt);
    const newUser = new User({
      name: login_info.username,
      _id: user._id,//_id?
    });

    return newUser.save();
  }

function login(req, res) {
  verify(req.body)//body is an object containing username and password
    .then((user) => {
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
};
