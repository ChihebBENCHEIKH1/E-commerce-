import mongoose from "mongoose";

export async function cleanDatabase() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully.");
  } else {
    throw new Error("Database is not connected.");
  }
}
