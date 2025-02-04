import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../thunks/AuthThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  message: "",
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "An error occurred during registration";
        state.message = "";
      });
  },
});

export default authSlice.reducer;
