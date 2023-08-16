import axios from "axios";
import { getUserToken } from "@/utils/authUtil";
const apiUrl = process.env.VUE_APP_API_URL as string;
const userToken = getUserToken();

export const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: userToken ? `Bearer ${userToken}` : "",
    "Content-Type": "application/json",
  },
});
