import express from "express";
import { json } from "body-parser";
import routes from "./routes";
import { connectDb } from "./utils/db";
import { ALLOWED_ORIGIN, MONGO_URI } from "./config/env";
import cors from "cors";
import { initializeSentry } from "./config/sentryconfig";
import * as Sentry from "@sentry/node";

const app = express();

const { requestHandler, tracingHandler, errorHandler } = initializeSentry(app)app.use(requestHandler);
app.use(tracingHandler);
app.use((req: any, res, next) => {
  if (req.user) {
    Sentry.setUser({ id: req.user.id, email: req.user.email });
  }
  next();
});

app.use(json());
app.use(
  cors({
    origin: String(ALLOWED_ORIGIN),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(routes);

const dbUri = String(MONGO_URI);
connectDb(dbUri);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
