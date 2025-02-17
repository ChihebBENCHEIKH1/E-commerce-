import axios from "axios";
import { BACKEND_URL } from "./env";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/auth/refresh-token`,
            {
              refreshToken,
            }
          );

          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refresh_token", data.refreshToken);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);

          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
