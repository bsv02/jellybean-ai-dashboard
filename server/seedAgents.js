import mongoose from "mongoose";
import dotenv from "dotenv";
import Agent from "./models/Agent.js";

dotenv.config();

const seedAgents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing agents
    await Agent.deleteMany();

    // Insert 4 agents
    const agents = [
      { name: "Alice", role: "Sales AI", status: "online" },
      { name: "Bob", role: "Support AI", status: "offline" },
      { name: "Charlie", role: "Marketing AI", status: "online" },
      { name: "Diana", role: "Research AI", status: "offline" },
    ];

    await Agent.insertMany(agents);

    console.log("Agents seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding agents:", error);
    process.exit(1);
  }
};

seedAgents();
