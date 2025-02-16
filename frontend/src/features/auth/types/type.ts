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
  role: UserRole;
  marketing?: boolean;
  profiling?: boolean;
  recaptcha: string;
};

export type ResetPasswordCredentials = {
  token: string;
  newPassword: string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
