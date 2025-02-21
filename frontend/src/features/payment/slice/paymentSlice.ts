import { createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent } from "../thunks/paymentThunks";

export interface PaymentState {
  status: "idle" | "processing" | "succeeded" | "failed";
  isProcessing: boolean;
  clientSecret?: string;
}
const initialState: PaymentState = {
  status: "idle",
  isProcessing: false,
  clientSecret: undefined,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    startPayment: (state) => {
      state.isProcessing = true;
      state.status = "processing";
    },
    paymentSuccess: (state) => {
      state.isProcessing = false;
      state.status = "succeeded";
    },
    paymentFailure: (state) => {
      state.isProcessing = false;
      state.status = "failed";
    },
    resetPayment: (state) => {
      state.isProcessing = false;
      state.status = "idle";
      state.clientSecret = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(createPaymentIntent.rejected, (state) => {
        state.isProcessing = false;
      });
  },
});

export const { startPayment, paymentSuccess, paymentFailure, resetPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
