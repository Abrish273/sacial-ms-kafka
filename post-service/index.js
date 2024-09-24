const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");
const postRoutes = require("./routes/postRoutes");
const { connectProducer } = require("./kafka/producer");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    await connectProducer();
    console.log("Kafka producer connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();