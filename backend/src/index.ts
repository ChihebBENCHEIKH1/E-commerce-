import express from "express";
import { json } from "body-parser";
import routes from "./routes";
import { connectDb } from "./utils/db";
import { ALLOWED_ORIGIN, MONGO_URI } from "./config/env";
import cors from "cors";

const app = express();

app.use(json());
app.use(
  cors({
    origin: String(ALLOWED_ORIGIN),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(routes);

const dbUri = String(MONGO_URI);
connectDb(dbUri);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
