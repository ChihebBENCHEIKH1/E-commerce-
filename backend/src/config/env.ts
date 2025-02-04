import { getEnvVar } from "../utils/helper";
import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = getEnvVar("MONGO_URI");
export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const SALT_ROUNDS = getEnvVar("SALT_ROUNDS", 10);
export const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN");
export const MONGO_URI_TEST = getEnvVar("MONGO_URI_TEST");
export const RECAPTCHA_SECRET_KEY = getEnvVar("RECAPTCHA_SECRET_KEY");
export const ALLOWED_ORIGIN = getEnvVar("ALLOWED_ORIGIN");
export const EMAIL_USERNAME = getEnvVar("EMAIL_USERNAME");
export const EMAIL_PASSWORD = getEnvVar("EMAIL_PASSWORD");
export const OTP_SECRET_KEY = getEnvVar("OTP_SECRET_KEY");
export const OTP_EXPIRATION_TIME = getEnvVar("OTP_EXPIRATION_TIME");
