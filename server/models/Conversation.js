import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  message_snippet: { type: String, required: true },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);