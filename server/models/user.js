const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  _id: String,
  description:{type:[String],default:'未编写简介'},
  chatted_with:{type:[String],default:[]},
  hashed_password: String
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema); 