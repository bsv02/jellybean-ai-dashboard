import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Agent from "./models/Agent.js";
import Conversation from "./models/Conversation.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/agents", async (req, res) => {
  try {
    const agents = await Agent.find().sort({ _id: 1 });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

// Add a new agent
app.post("/agents", async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(500).json({ error: "Failed to add agent" });
  }
});

// Toggle agent status (online/offline)
app.patch("/agents/:id/status", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: "Agent not found" });

    agent.status = agent.status === "online" ? "offline" : "online";
    const updatedAgent = await agent.save();

    res.json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update agent status" });
  }
});

// Update an agent
app.put("/agents/:id", async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update agent" });
  }
});

// Delete an agent
app.delete("/agents/:id", async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete agent" });
  }
});

// Get all conversations
app.get("/conversations", async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ timestamp: -1 });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// Add a new conversation
app.post("/conversations", async (req, res) => {
  try {
    const newConversation = new Conversation(req.body);
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json({ error: "Failed to add conversation" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
