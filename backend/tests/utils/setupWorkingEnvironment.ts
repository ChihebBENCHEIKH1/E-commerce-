import express from "express";
import { json } from "body-parser";
import routes from "../../src/routes";
import dotenv from "dotenv";
import { connectDb } from "../../src/utils/db";
import { cleanDatabase } from "./db";
import { MONGO_URI_TEST } from "../../src/config/env";

export async function setupWorkingEnvironment() {
  dotenv.config();

  const app = express();

  app.use(json());

  app.use(routes);

  const dbUri = MONGO_URI_TEST;
  await connectDb(String(dbUri));

  await cleanDatabase();

  const PORT = process.env.PORT || 3000;
  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
