import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { RESET_PASSWORD_SECRET_KEY } from "../config/env";
import { ObjectId } from "mongoose";

export const resetPasswordTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, String(RESET_PASSWORD_SECRET_KEY)) as {
      userId: ObjectId;
    };

    const user = await UserModel.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error validating reset password token:", error);
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }
};
