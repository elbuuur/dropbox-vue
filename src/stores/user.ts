import { defineStore } from "pinia";
import { httpClient } from "@/api";
import { isAuth, removeUserToken } from "@/utils/authUtil";

export const useUserStore = defineStore("auth", {
  state: () => {
    return {
      isAuthenticated: isAuth(),
      userData: {
        name: "",
        email: "",
        uploadLimit: 0,
      },
    };
  },

  getters: {
    getUser({ userData }) {
      return userData;
    },
  },

  actions: {
    async fetchUserData() {
      try {
        const httpClientResponse = httpClient
          .post("user-info")
          .then((response) => {
            const userName = response.data.data.user.name;
            const email = response.data.data.user.email;
            const uploadLimit = response.data.data.user.upload_limit;

            this.setUserData(userName, email, uploadLimit);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async setUserData(
      nameValue: string,
      emailValue: string,
      uploadLimitValue: number
    ) {
      this.isAuthenticated = true;
      this.userData.name = nameValue;
      this.userData.email = emailValue;
      this.userData.uploadLimit = uploadLimitValue;
    },

    logoutUser() {
      removeUserToken();
      this.isAuthenticated = false;
      this.clearUserData();
    },

    clearUserData() {
      this.userData.name = "";
      this.userData.email = "";
      this.userData.uploadLimit = 0;
    },
  },
});
