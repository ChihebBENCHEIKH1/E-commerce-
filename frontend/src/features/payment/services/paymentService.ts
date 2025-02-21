import axiosInstance from "../../../config/AxiosInstance";

export const createPaymentIntentService = async (data: unknown) => {
  try {
    const response = await axiosInstance.post(
      `/transactions/create-payment-intent`,
      data
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
