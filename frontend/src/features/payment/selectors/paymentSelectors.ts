import { AppState } from "../../../store/store";

export const getPaymentStatus = (state: AppState) => state.payment.status;
export const getClientSecret = (state: AppState) => state.payment.clientSecret;
