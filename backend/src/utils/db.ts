import mongoose from "mongoose";

export const connectDb = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error disconnecting from MongoDB", err);
  }
};
