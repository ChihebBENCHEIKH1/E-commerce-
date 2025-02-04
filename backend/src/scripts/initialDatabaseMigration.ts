import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { connectDb, disconnectDb } from "../utils/db";
import { UserModel } from "../models/user/User";
import dotenv from "dotenv";
import { MONGO_URI, SALT_ROUNDS } from "../config/env";
dotenv.config();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = Number(SALT_ROUNDS);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function seedUsers() {
  try {
    const dbUri = MONGO_URI;
    console.log("Seeding random users...", dbUri);
    await connectDb(String(dbUri));

    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: await hashPassword("password123"),
      };
      users.push(user);
    }

    await UserModel.insertMany(users);
    console.log("Random users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    await disconnectDb();
    process.exit(0);
  }
}

seedUsers();
