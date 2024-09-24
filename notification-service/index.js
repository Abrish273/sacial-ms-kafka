const express = require("express");
const dotenv = require("dotenv");
const { consumeNotifications } = require("./kafka/consumer");
const connectDB = require("./config/mongo");

dotenv.config();
const app = express();

consumeNotifications();
connectDB();
const PORT = process.env.PORT || 6000;
app.listen(PORT, () =>
  console.log(`Notification service running on port ${PORT}`)
);
