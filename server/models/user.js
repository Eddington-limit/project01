const mongoose = require("mongoose");
const path = require("path");

const UserSchema = new mongoose.Schema({
  name: String,
  _id: String,
  description:String,
  profile_pic:String,//how to store image?
  chatted_with:[String]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
