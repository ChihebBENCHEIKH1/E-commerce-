export enum AuthPaths {
  login = "/login",
  register = "/register",
  forgotPassword = "/forgot-password",
  resetPassword = "/reset-password",
}

export type UserCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  marketing?: boolean;
  profiling?: boolean;
  recaptcha: string;
};

export type ResetPassword = {
  email: string;
  otp: string;
  newPassword: string;
};
