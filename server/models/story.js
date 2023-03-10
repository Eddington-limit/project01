const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  liked_by: {type: [String], default: []},
  num_of_likes:{ type: Number, default: 0},
  num_of_comments:{ type: Number, default: 0}
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
