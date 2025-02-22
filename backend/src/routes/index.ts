import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../config/inversifyConstants";
import { IRouter } from "./interfaces/IRouter";

const router = Router();

const authRouter = container.getNamed<IRouter>(TYPES.IRouter, "AuthRouter");
const TransactionRouter = container.getNamed<IRouter>(
  TYPES.IRouter,
  "TransactionRouter"
);
const staticContentRouter = container.getNamed<IRouter>(
  TYPES.IRouter,
  "StaticContentRouter"
);

router.use("/api/auth", authRouter.router);
router.use("/api/transactions", TransactionRouter.router);
router.use("/api", staticContentRouter.router);

export default router;
