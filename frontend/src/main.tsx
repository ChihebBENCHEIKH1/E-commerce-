import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { VITE_STRIPE_PUBLISHED_KEY } from "./config/env.ts";
import * as Sentry from "@sentry/react";

const stripePromise = loadStripe(VITE_STRIPE_PUBLISHED_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <App />
        </Sentry.ErrorBoundary>
      </Elements>
    </Provider>
  </React.StrictMode>
);
