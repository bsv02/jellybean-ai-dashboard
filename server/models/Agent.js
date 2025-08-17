import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["online", "offline"], default: "offline" },
}, { timestamps: true }); 

export default mongoose.model("Agent", agentSchema);