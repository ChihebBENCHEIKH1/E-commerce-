import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { connectDb, disconnectDb } from "../utils/db";
import { UserModel } from "../models/user/User";
import { getEnvVar } from "../utils/helper";
import dotenv from "dotenv";
dotenv.config();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = Number(getEnvVar("SALT_ROUNDS", 10));
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function seedUsers() {
  try {
    const dbUri = getEnvVar("MONGO_URI");
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
