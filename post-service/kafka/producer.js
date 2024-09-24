const kafka = require("../config/kafka");
const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected successfully");
  } catch (error) {
    console.error("Error connecting Kafka producer:", error.message);
  }
};

const producePostEvent = async (topic, event) => {
  try {
    await producer.send({
      topic,
      messages: [
        { key: event.postId.toString(), value: JSON.stringify(event) },
      ],
      // acks: "all",
    });
    console.log("Produced event:", event);
  } catch (error) {
    console.log("error in kafka producer", error.message);
  }
};

module.exports = { connectProducer, producePostEvent };