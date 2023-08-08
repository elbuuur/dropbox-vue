import { defineStore } from "pinia";
import { httpClient } from "@/api";
import { isAuth } from "@/utils/authUtils";

export const useUserStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: isAuth(),
      userData: {
        name: "",
        uploadLimit: 0,
      },
    };
  },

  getters: {
    getUser({ userData }) {
      return userData;
    },

    getIsAuthenticated() {
      return isAuth();
    },
  },

  actions: {
    async getUserData() {
      try {
        const httpClientResponse = httpClient
          .post("user-info")
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    },

    setUserData(nameValue: string, uploadLimitValue: number) {
      this.isAuthenticated = true;
      this.userData.name = nameValue;
      this.userData.uploadLimit = uploadLimitValue;
    },
  },
});
