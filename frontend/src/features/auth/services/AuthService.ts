import { ResetPassword, UserCredentials } from "../types/type";
import axiosInstance from "../../../config/AxiosInstance";

export const authenticateUserService = async (credentials: UserCredentials) => {
  try {
    const response = axiosInstance.post(`/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const registerUserService = async (credentials: UserCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, credentials);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const resetPasswordWithOTPService = async (
  credentials: ResetPassword
) => {
  try {
    const response = await axiosInstance.post(
      `/auth/reset-password`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
