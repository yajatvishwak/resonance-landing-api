import mongoose from "mongoose";

export async function connectToDatabase(): Promise<boolean> {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/resonance";

    await mongoose.connect(uri);

    console.log("Successfully connected to MongoDB");
    return true;
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
    return false;
  }
}
