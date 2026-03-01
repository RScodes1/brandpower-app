import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

let isConnected = false;

export async function connectMongo() {
  if (isConnected) return;

  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}