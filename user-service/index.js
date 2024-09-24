const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");
const userRoutes = require("./routes/userRoutes");
const { connectProducer } = require("./kafka/producer");

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
connectDB();

// User routes
app.use("/api/users", userRoutes);

connectProducer();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
