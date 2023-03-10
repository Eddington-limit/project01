const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  _id: String,
  description:String,
  profile_pic:String//how to store image?
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
