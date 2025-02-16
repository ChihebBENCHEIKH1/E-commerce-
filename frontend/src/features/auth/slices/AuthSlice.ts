import { createSlice } from "@reduxjs/toolkit";
import {
  appInit,
  loginUser,
  registerUser,
  resetPassword,
  verifyOtp,
} from "../thunks/AuthThunk";

export interface AuthState {
  isAuthenticated: boolean;
  isTokenChecked: boolean;
  isProcessing: boolean;
  user?: any;
  error?: string | null;
  message: string;
  isOTPVerified: boolean;
  isPasswordReset: boolean;
  isUserCreated: boolean;
}

const initialState: AuthState = {
  user: null,
  isProcessing: false,
  error: null,
  message: "",
  isAuthenticated: false,
  isTokenChecked: false,
  isPasswordReset: false,
  isUserCreated: false,
  isOTPVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.message = action.payload.message;
        state.isUserCreated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || "An error occurred during registration";
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.message = "";
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isTokenChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || "An error occurred during login";
        state.message = "";
      })
      .addCase(loginUser.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.message = "";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.message = action.payload.message;
        state.isOTPVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || "An error occurred during login";
        state.message = "";
      })
      .addCase(appInit.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isTokenChecked = true;
      })
      .addCase(appInit.rejected, (state) => {
        state.isAuthenticated = false;
        state.isTokenChecked = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.message = action.payload.message;
        state.isPasswordReset = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || "An error occurred during login";
        state.message = "";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.message = "";
      });
  },
});

export default authSlice.reducer;
