import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { SENTRY_DSN } from "./config/env";

Sentry.init({
  dsn: SENTRY_DSN as string,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
});

Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

Sentry.profiler.stopProfiler();
