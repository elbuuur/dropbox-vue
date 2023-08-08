import {
  LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_NAME,
  LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_EXPIRATION,
  LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_EMAIL,
} from "@/config/constants";

const expirationMinutes = 30;

export function saveUserStorageData(userName: string, userEmail: string) {
  const expirationTime = Date.now() + expirationMinutes * 60 * 1000;

  localStorage.setItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_NAME,
    userName
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_EMAIL,
    userEmail
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_EXPIRATION,
    expirationTime.toString()
  );
}

export function getUserStoredData() {
  const expirationTime = localStorage.getItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_EXPIRATION
  );

  const storedUserName = localStorage.getItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_NAME
  );

  const storedEmail = localStorage.getItem(
    LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_EMAIL
  );

  return { expirationTime, storedUserName, storedEmail };
}

export function removeUserStoredData() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_NAME);
  localStorage.removeItem(LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_USER_EMAIL);
  localStorage.removeItem(LOCAL_STORAGE_KEY_SUCCESS_REGISTRATION_EXPIRATION);
}
