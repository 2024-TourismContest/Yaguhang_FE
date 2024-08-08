import axios, { AxiosInstance } from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const defaultApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 2500,
  headers: {
    accept: "application/json",
  },
});
