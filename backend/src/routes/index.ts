// src/routes/index.ts
import { Router } from "express";
import { container } from "../config/inversify.config";
import { AuthRoutes } from "./AuthRoutes";
import { TYPES } from "../config/inversifyConstants";

const router = Router();

const authRoutes = container.get<AuthRoutes>(TYPES.AuthRoutes);

router.use("/api/auth", authRoutes.router);

export default router;
