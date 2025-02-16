import { ResetPasswordCredentials } from "./../types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authenticateUserService,
  registerUserService,
  resetPasswordService,
  verifyOtpService,
} from "../services/AuthService";
import { UserCredentials } from "../types/type";
import { refreshTokenService } from "../services/AuthService";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await registerUserService(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await authenticateUserService(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }: { rejectWithValue: (value: any) => void }
  ) => {
    try {
      const response = await verifyOtpService({ email, otp });
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || "OTP verification failed"
      );
    }
  }
);
export const appInit = createAsyncThunk(
  "auth/appInit",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshTokenService();
      return response;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue("Network error: No response from server");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials: ResetPasswordCredentials) => {
    try {
      const response = await resetPasswordService(credentials);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);
