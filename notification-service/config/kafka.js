const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "social-media-app",
  brokers: ["localhost:9092:9092"], // "kafka-broker2:9092", "kafka-broker3:9092"],
  retry: {
    retries: 5,
  },
});

module.exports = kafka;
