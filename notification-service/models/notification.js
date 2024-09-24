const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  content: { type: String },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
