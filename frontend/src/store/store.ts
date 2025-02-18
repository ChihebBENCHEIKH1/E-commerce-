import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/slices/AuthSlice";
import { countriesApi } from "../services/coutriesApi";
import { appInit } from "../features/auth/thunks/AuthThunk";
import { motorcycleApi } from "../services/motorcyclesApi";

export interface AppState {
  auth: AuthState;
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [motorcycleApi.reducerPath]: motorcycleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(motorcycleApi.middleware),
});

export default store;
store.dispatch(appInit());
