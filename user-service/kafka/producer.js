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

const produceUserEvent = async (topic, event) => {
  try {
    console.log("==== event === ", event);
    console.log("---- kafka topic ---- ", topic);

    await producer.send({
      topic,
      messages: [
        { key: event.userId.toString(), value: JSON.stringify(event) },
      ],
    //   acks: "all", // Ensures all replicas acknowledge before proceeding
    });

    console.log("Produced event:", event);
  } catch (error) {
    console.log("Error in Kafka producer:", error.message);
  }
};

module.exports = { connectProducer, produceUserEvent };
