import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "../store/store";

// const BASE_URL = "http://localhost:9000";
// const BASE_URL = "https://138.199.202.140:9090";
const BASE_URL = "https://ticketing-system-cwoz.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
