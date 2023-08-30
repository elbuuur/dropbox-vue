import Cookies from "js-cookie";
import { AUTH_TOKEN_NAME } from "@/config/constants";

export function getUserToken() {
  return Cookies.get(AUTH_TOKEN_NAME);
}
export function isAuth() {
  return !!Cookies.get(AUTH_TOKEN_NAME);
}

export function setUserToken(token: string) {
  Cookies.set(AUTH_TOKEN_NAME, token, { expires: 1 });
}

export function removeUserToken() {
  Cookies.remove(AUTH_TOKEN_NAME);
}
