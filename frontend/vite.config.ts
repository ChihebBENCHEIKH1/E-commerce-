import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import {
  VITE_SENTRY_AUTH_TOKEN,
  VITE_SENTRY_ORG,
  VITE_SENTRY_PROJECT,
  VITE_SENTRY_RELEASE,
} from "./src/config/env";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: VITE_SENTRY_ORG,
      project: VITE_SENTRY_PROJECT,
      authToken: VITE_SENTRY_AUTH_TOKEN,
      release: VITE_SENTRY_RELEASE,
    }),
  ],
  base: "MotorcycleXpert/",
});
