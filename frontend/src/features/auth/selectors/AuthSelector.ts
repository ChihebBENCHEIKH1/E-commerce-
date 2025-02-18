import { AppState } from "../../../store/store";

export const getIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated;
export const getTokenStatus = (state: AppState) => state.auth.isTokenChecked;
export const getIsAuthProcessing = (state: AppState) => state.auth.isProcessing;
export const getAuthError = (state: AppState) => state.auth.error;
export const getAuthRole = (state: AppState) => state.auth.user?.role;
export const getAuthUser = (state: AppState) => state.auth.user;
export const getAuthMessage = (state: AppState) => state.auth.message;
export const getIsOTPVerified = (state: AppState) => state.auth.isOTPVerified;
export const getIsUserCreated = (state: AppState) => state.auth.isUserCreated;
export const getIsPasswordReset = (state: AppState) =>
  state.auth.isPasswordReset;
