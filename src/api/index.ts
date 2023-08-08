import axios from "axios";
import { getUserToken } from "@/utils/authUtils";
const apiUrl = process.env.VUE_APP_API_URL as string;
const userToken = getUserToken();

export const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + userToken ? userToken : "",
    "Content-Type": "application/json",
  },
});
