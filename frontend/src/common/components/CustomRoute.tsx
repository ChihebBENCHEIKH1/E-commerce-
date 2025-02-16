import React from "react";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "./FullPageSpinner";

interface CustomRouteProps {
  element: React.ReactElement;
  isTokenChecked: boolean;
  isAuthenticated: boolean;
  redirect?: string;
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  element,
  isTokenChecked,
  isAuthenticated,
  redirect = "/MotorcycleXpert/login",
}) => {
  if (!isTokenChecked) {
    return <FullPageSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirect} replace />;
  }

  return element;
};

export default CustomRoute;
