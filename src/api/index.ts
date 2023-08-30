import axios from "axios";
import { getUserToken } from "@/utils/authUtil";
const apiUrl = process.env.VUE_APP_API_URL as string;

export const httpClient = axios.create({
  baseURL: apiUrl + "api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
