const express = require("express");
const Post = require("../models/post");
const { producePostEvent } = require("../kafka/producer");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { content, userId } = req.body;
  const newPost = new Post({ content, userId });

  await newPost.save();

  await producePostEvent("post-events", {
    eventType: "PostCreated",
    postId: newPost._id,
    content: newPost.content,
    userId: newPost.userId,
  });

  res.status(201).json({ message: "Post created successfully" });
});

module.exports = router;
