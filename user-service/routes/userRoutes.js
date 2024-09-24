const express = require("express");
const User = require("../models/user");
const { produceUserEvent } = require("../kafka/producer");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, profilePicture } = req.body;
  const newUser = new User({ username, email, profilePicture });

  const user = await newUser.save();
  console.log("==== user === ", user);

  await produceUserEvent("user-events", {
    eventType: "UserRegistered",
    userId: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });

  console.log(" --- hiii ---");
  return res
    .status(201)
    .json({ message: "User registered successfully", user });
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, profilePicture } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { username, email, profilePicture },
    { new: true }
  );

  await produceUserEvent("user-events", {
    eventType: "UserUpdated",
    userId: user._id,
    username: user.username,
    email: user.email,
  });

  res.status(200).json({ message: "User updated successfully" });
});

module.exports = router;