import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/slices/AuthSlice";
import { countriesApi } from "../services/coutriesApi";
import { appInit } from "../features/auth/thunks/AuthThunk";

export interface AppState {
  auth: AuthState;
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export default store;
store.dispatch(appInit());
