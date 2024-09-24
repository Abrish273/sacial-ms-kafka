const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "social-media-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"], // Make sure these are correct
});

module.exports = kafka;
