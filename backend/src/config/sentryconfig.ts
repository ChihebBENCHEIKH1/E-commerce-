import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { Express } from "express"; // Import Express types
import { NODE_ENV, SENTRY_DSN, SENTRY_RELEASE } from "./env";

export const initializeSentry = (app: Express) => {
  Sentry.init({
    dsn: SENTRY_DSN as string,
    environment: (NODE_ENV as string) || "development",
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: NODE_ENV === "production" ? 0.1 : 1.0,
    beforeSend(event: Sentry.Event) {
      if (
        event.exception &&
        event.exception.values &&
        event.exception.values[0].value === "NotFound"
      ) {
        return null;
      }
      return event;
    },
    release: SENTRY_RELEASE as string,
  });

  return {
    requestHandler: Sentry.Handlers.requestHandler(),
    tracingHandler: Sentry.Handlers.tracingHandler(),
    errorHandler: Sentry.Handlers.errorHandler(),
  };
};
