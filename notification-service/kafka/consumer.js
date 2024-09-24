const kafka = require("../config/kafka");
const Notification = require("../models/notification");
const consumer = kafka.consumer({ groupId: "notification-group" });

/*
  group different events in to one group
*/

// Connect the Kafka consumer
const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected successfully");
  } catch (error) {
    console.error("Error connecting Kafka consumer:", error.message);
    throw error;
  }
};

// Subscribe to topics
const subscribeToTopics = async (topics) => {
  try {
    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: true });
      console.log(`Subscribed to topic: ${topic}`);
    }
  } catch (error) {
    console.error("Error subscribing to topics:", error.message);
    throw error;
  }
};

// Handle incoming messages from Kafka topics
const handleMessages = async () => {
  try {
    console.log("Consumer started, waiting for messages...");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message in notification service:
          Topic: ${topic}
          Partition: ${partition}
          Key: ${message.key?.toString()}
          Value: ${message.value?.toString()}
          Offset: ${message.offset}`);

        const event = JSON.parse(message.value.toString());

        // Add some debugging info before processing the event
        console.log("Processing event:", event);

        processEvent(topic, event);
      },
    });
  } catch (error) {
    console.error("Error running Kafka consumer:", error.message);
  }
};

// Process event based on topic and event type
const processEvent = (topic, event) => {
  console.log(" reslly hi");
  if (topic === "user-events") {
    handleUserEvent(event);
  } else if (topic === "post-events") {
    console.log("second hii");
    handlePostEvent(event);
  } else {
    console.error("Unknown topic:", topic);
  }
};

// Handle User Events
const handleUserEvent = async (event) => {
  if (event.eventType === "UserUpdated") {
    console.log(`Notify: User ${event} updated their profile`);
    const query = {
      userId: event.userId,
      content: event.username,
    };
    console.log("+++ query +++", JSON.stringify(event, null, 2));
    console.log("=== query ===", query);

    try {
      const newUser = new Notification(query);
      const response = await newUser.save();
      console.log("response created in the handle user event", response);
    } catch (error) {
      console.log("error in handle user Event", error.message);
    }
  }
};

// Handle Post Events
const handlePostEvent = (event) => {
  if (event.eventType === "PostCreated") {
    console.log(`Notify: User ${event.userId} created a post`);
  }
};

// Main function to start consuming
const consumeNotifications = async () => {
  try {
    await connectConsumer();
    await subscribeToTopics(["user-events", "post-events"]);
    await handleMessages();
  } catch (error) {
    console.error("Error in Kafka consumer:", error.message);
  }
};

module.exports = { consumeNotifications };
