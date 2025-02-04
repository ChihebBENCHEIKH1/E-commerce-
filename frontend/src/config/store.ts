import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/AuthSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
