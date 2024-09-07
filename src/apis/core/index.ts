import axios, { AxiosInstance } from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = import.meta.env.VITE_REACT_TOKEN;

export const defaultApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});
defaultApi.interceptors.request.use(
  (config) => {
    // 로컬 스토리지나 다른 저장소에서 토큰을 가져옴
    // const token = localStorage.getItem("authToken");

    // 토큰이 있을 경우에만 Authorization 헤더 추가
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
