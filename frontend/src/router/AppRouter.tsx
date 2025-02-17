import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getIsAuthenticated,
  getAuthRole,
  getTokenStatus,
} from "../features/auth/selectors/AuthSelector";
import { navigationRoutes, RegisterPage } from "./navigation";
import CustomRoute from "../common/components/CustomRoute";
import { FullPageSpinner } from "../common/components/FullPageSpinner";
import LoginPage from "../features/auth/pages/LoginPage";
import OTPVerificationPage from "../features/auth/pages/OTPVerificationPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import { UserRole } from "../features/auth/types/type";

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isTokenChecked = useSelector(getTokenStatus);
  const isUserAdmin = useSelector(getAuthRole) === UserRole.ADMIN;
  const defaultRedirectRoute: string =
    isAuthenticated && isTokenChecked
      ? "/MotorcycleXpert/home"
      : "/MotorcycleXpert/login";

  return (
    <Router>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route path="/MotorcycleXpert/register" element={<RegisterPage />} />
          <Route path="/MotorcycleXpert/login" element={<LoginPage />} />
          <Route
            path="/MotorcycleXpert/otp-login"
            element={<OTPVerificationPage />}
          />
          <Route
            path="/MotorcycleXpert/reset-password"
            element={<ResetPasswordPage />}
          />
          {navigationRoutes.map((route, index) => (
            <Route
              key={`${route.path}${index}`}
              path={route.path}
              element={
                <CustomRoute
                  element={<route.component />}
                  isAuthenticated={isAuthenticated}
                  isTokenChecked={isTokenChecked}
                  redirect={route.redirect}
                />
              }
            />
          ))}
          <Route
            path="*"
            element={<Navigate to={defaultRedirectRoute} replace />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
