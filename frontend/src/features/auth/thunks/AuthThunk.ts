import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserService } from "../services/AuthService";
import { UserCredentials } from "../types/type";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await registerUserService(credentials);
      return {
        message:
          "Registration successful! Please check your email to confirm your account.",
        user: response.data,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Registration failed");
    }
  }
);
