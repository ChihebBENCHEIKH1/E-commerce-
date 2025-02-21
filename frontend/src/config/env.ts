import { getEnvVar } from "../utils/helpers";

export const RECAPTCHA_SECRET_KEY: string = getEnvVar(
  "VITE_RECAPTCHA_SECRET_KEY"
);
export const BACKEND_URL: string = getEnvVar("VITE_BACKEND_URL");
export const VITE_STRIPE_PUBLISHED_KEY: string = getEnvVar(
  "VITE_STRIPE_PUBLISHED_KEY"
);
export const VITE_SENTRY_DSN = getEnvVar("VITE_SENTRY_DSN") || "";
export const VITE_SENTRY_RELEASE = getEnvVar("VITE_SENTRY_RELEASE") || "";
export const VITE_SENTRY_ORG = getEnvVar("VITE_SENTRY_ORG") || "";
export const VITE_SENTRY_PROJECT = getEnvVar("VITE_SENTRY_PROJECT") || "";
export const VITE_SENTRY_AUTH_TOKEN = getEnvVar("VITE_SENTRY_AUTH_TOKEN") || "";
export const VITE_SENTRY_RELEASE_STAGE =
  getEnvVar("VITE_SENTRY_RELEASE_STAGE") || "";
export const MODE = getEnvVar("MODE") || "";
