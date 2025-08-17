import { Schema, model } from "mongoose";

const signupSchema = new Schema({
  userEmail: { type: String, required: true, unique: true },
  requestedLinkedinUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  snapshot_id: { type: String, required: false },
  analysis: { type: String, required: false },
  isCompleted: { type: Boolean, default: false },
});

export const Signup = model("Signup", signupSchema);
