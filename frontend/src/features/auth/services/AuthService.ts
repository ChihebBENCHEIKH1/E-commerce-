import { ResetPasswordCredentials, UserCredentials } from "../types/type";
import axiosInstance from "../../../config/AxiosInstance";
import { setLocalStorageItem } from "../../../utils/helpers";

export const authenticateUserService = async (credentials: UserCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    setLocalStorageItem("token", response.data.token);
    setLocalStorageItem("refreshToken", response.data.refreshToken);
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

export const verifyOtpService = async (credentials: {
  email: string;
  otp: string;
}) => {
  try {
    const response = await axiosInstance.post(`/auth/verify-otp`, credentials);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const resetPasswordService = async (
  credentials: ResetPasswordCredentials
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

export const refreshTokenService = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken,
    });
    setLocalStorageItem("token", response.data.token);
    setLocalStorageItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
