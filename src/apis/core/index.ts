import axios, { AxiosInstance } from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const getAuthToken = () => localStorage.getItem("token") || "";
const token = getAuthToken();
export const defaultApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
defaultApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 오류 시 수행할 작업
    return Promise.reject(error);
  }
);
