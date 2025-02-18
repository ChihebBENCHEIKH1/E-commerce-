import jwt, { JwtPayload, verify } from "jsonwebtoken";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  RESET_PASSWORD_EXPIRATION_TIME,
  RESET_PASSWORD_SECRET_KEY,
} from "../config/env";
import { ObjectId } from "mongoose";

export const generateAccessToken = (userId: ObjectId) =>
  jwt.sign({ userId }, String(JWT_SECRET), {
    expiresIn: JWT_EXPIRES_IN as number,
  });

export const generateRefreshToken = (userId: ObjectId) =>
  jwt.sign({ userId }, String(REFRESH_TOKEN_SECRET), {
    expiresIn: Number(REFRESH_TOKEN_EXPIRES_IN),
  });

export const generatePasswordResetToken = (userId: ObjectId) =>
  jwt.sign({ userId }, String(RESET_PASSWORD_SECRET_KEY), {
    expiresIn: Number(RESET_PASSWORD_EXPIRATION_TIME),
  });

export const verifyRefreshToken = (token: string): JwtPayload => {
  return verify(token, String(REFRESH_TOKEN_SECRET)) as JwtPayload;
};

export const verifyAccessToken = (token: string): JwtPayload =>
  verify(token, String(JWT_SECRET)) as JwtPayload;
