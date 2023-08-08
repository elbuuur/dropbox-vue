<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <notification-message
        v-if="registeredUserName"
        notification-type="success"
      >
        Hi, {{ registeredUserName }}! <br />
        Your account has been successfully created
      </notification-message>
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <input-field
          v-model="email"
          @keydown.enter="loginUser"
          :error="errors.email"
          name="email"
          type="email"
          title="Email address"
          @reset-validation="errors.email = $event"
        ></input-field>

        <input-field
          v-model="password"
          @keydown.enter="loginUser"
          :error="errors.password"
          name="password"
          type="password"
          title="Password"
          @reset-validation="errors.password = $event"
        ></input-field>

        <notification-message v-if="errors.validate" notification-type="error">
          {{ errors.validate }}
        </notification-message>

        <div>
          <base-button @click="loginUser" text="Sign in"></base-button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <router-link
          :to="{ name: 'registration' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { validateUserFields } from "@/utils/validation/validateUserFields";
import {
  getValidationErrors,
  getErrorsFromResponse,
} from "@/utils/validation/getValidationErrors";
import { ValidationError } from "yup";
import { setUserToken } from "@/utils/authUtils";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { httpClient } from "@/api";
import {
  getUserStoredData,
  removeUserStoredData,
} from "@/utils/localStorageUtils";
import InputField from "@/components/kit/input/InputField.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";

const registeredUserName = ref("");
const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  const { expirationTime, storedUserName, storedEmail } = getUserStoredData();

  if (expirationTime && storedUserName && storedEmail) {
    if (Date.now() < parseInt(expirationTime)) {
      registeredUserName.value = storedUserName;
      email.value = storedEmail;
    } else {
      removeUserStoredData();
    }
  }
});

async function loginUser() {
  try {
    await validateUserFields(undefined, email.value, password.value);
    errors.value = {};

    httpClient
      .post("login", { email: email.value, password: password.value })
      .then((response) => {
        const userToken = response.data.data.token;
        const userName = response.data.data.user.name;
        const userUploadLimit = response.data.data.user.upload_limit;

        setUserToken(userToken);
        userStore.setUserData(userName, userUploadLimit);

        removeUserStoredData();

        router.push({ name: "home" });
      })
      .catch((error) => {
        errors.value = getErrorsFromResponse(error.response.data.data);
      });
  } catch (error) {
    if (error instanceof ValidationError) {
      errors.value = getValidationErrors(error);
    }
  }
}
</script>
