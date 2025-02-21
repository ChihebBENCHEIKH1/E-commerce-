import React, { lazy } from "react";

export interface CustomRouteProps {
  component: React.ComponentType<unknown> | React.LazyExoticComponent<unknown>;
  redirect?: string;
  secured?: boolean;
  isUserAdmin?: boolean;
  exact?: boolean;
  path: string;
}

export const RegisterPage = lazy(
  () => import("../features/auth/pages/RegisterPage")
);
export const Login = lazy(() => import("../features/auth/pages/LoginPage"));

const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const Checkout = lazy(() => import("../features/payment/pages/CheckoutPage"));
export const navigationRoutes: CustomRouteProps[] = [
  {
    component: HomePage,
    redirect: "/",
    secured: false,
    isUserAdmin: false,
    exact: true,
    path: "MotorcycleXpert/home",
  },
  {
    component: Checkout,
    redirect: "/",
    secured: false,
    isUserAdmin: false,
    exact: true,
    path: "MotorcycleXpert/checkout",
  },
];
