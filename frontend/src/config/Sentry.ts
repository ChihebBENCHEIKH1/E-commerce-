import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { MODE, VITE_SENTRY_DSN, VITE_SENTRY_RELEASE } from "./env";

Sentry.init({
  dsn: VITE_SENTRY_DSN,
  environment: MODE || "development",
  integrations: [new BrowserTracing()],
  tracesSampleRate: MODE === "production" ? 0.1 : 1.0,
  release: VITE_SENTRY_RELEASE,
});
