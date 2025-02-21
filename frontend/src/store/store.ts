import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/slices/AuthSlice";
import { countriesApi } from "../services/coutriesApi";
import { appInit } from "../features/auth/thunks/AuthThunk";
import { motorcycleApi } from "../services/motorcyclesApi";
import homeReducer, { HomeState } from "../features/home/slices/homeSlice";
import paymentReducer, {
  PaymentState,
} from "../features/payment/slice/paymentSlice";
export interface AppState {
  auth: AuthState;
  home: HomeState;
  payment: PaymentState;
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    payment: paymentReducer,
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
