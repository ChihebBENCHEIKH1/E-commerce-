import { getEnvVar } from "../utils/helpers";

export const RECAPTCHA_SECRET_KEY: string = getEnvVar(
  "VITE_RECAPTCHA_SECRET_KEY"
);
export const BACKEND_URL: string = getEnvVar("VITE_BACKEND_URL");
export const VITE_STRIPE_PUBLISHED_KEY: string = getEnvVar(
  "VITE_STRIPE_PUBLISHED_KEY"
);
export const VITE_SENTRY_DSN = getEnvVar("VITE_SENTRY_DSN") || "";
