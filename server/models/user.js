const mongoose = require("mongoose");
const path = require("path");

const UserSchema = new mongoose.Schema({
  name: String,
  _id: String,
  description:String,
  chatted_with:[String],
  hashed_password: String
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema); 