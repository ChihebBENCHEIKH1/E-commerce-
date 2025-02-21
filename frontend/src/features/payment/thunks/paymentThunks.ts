import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPaymentIntentService } from "../services/paymentService";

export const createPaymentIntent = createAsyncThunk(
  "home/createPaymentIntent",
  async (paymentData: { amount: number; currency: string; user: unknown }) => {
    try {
      const response = await createPaymentIntentService(paymentData);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);
