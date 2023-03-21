const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  _id: Number,
  description:{type:[String],default:'未编写简介'},
  chatted_with:{type:[String],default:[]},//包含所有私聊过的用户的_id
  hashed_password: String
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema); 