import mongoose from "mongoose";
import { config } from "./config.js";

/**
 * connectDB
 * Establishes a connection to MongoDB using the MONGO_URI environment variable.
 * Called once at server startup.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongo_uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process on DB failure
  }
};

export default connectDB;
