const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/user-service", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
