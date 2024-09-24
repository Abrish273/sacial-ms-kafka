const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
