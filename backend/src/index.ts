import express from "express";
import { json } from "body-parser";
import routes from "./routes";
import { connectDb } from "./utils/db";
import { ALLOWED_ORIGIN, MONGO_URI } from "./config/env";
import cors from "cors";
import * as Sentry from "@sentry/node";
import "./instrument";

const app = express();

app.use(json());
app.use(
  cors({
    origin: String(ALLOWED_ORIGIN),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

Sentry.setupExpressErrorHandler(app);
app.use(function onError(err: any, req: any, res: any, next: any) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});
app.use(express.json());

app.use(routes);

const dbUri = String(MONGO_URI);
connectDb(dbUri);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
