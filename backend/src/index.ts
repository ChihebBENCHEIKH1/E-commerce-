import express from "express";
import { json } from "body-parser";
import routes from "./routes";
import dotenv from "dotenv";
import { getEnvVar } from "./utils/helper";
import { connectDb } from "./utils/db";

dotenv.config();

const app = express();

app.use(json());

app.use(routes);

const dbUri = getEnvVar("MONGO_URI");
connectDb(String(dbUri));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
