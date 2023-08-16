<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <view-logo></view-logo>
      <notification-message
        v-if="registeredUserName"
        notification-type="success"
      >
        Hi, {{ registeredUserName }}! <br />
        Your account has been successfully created
      </notification-message>
      <h2 class="mt-10 text-center">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <input-field
          v-model="email"
          @keydown.enter="loginUser"
          :error="errors.email"
          name="email"
          type="email"
          autocomplete="email"
          title="Email address"
          @reset-validation="errors.email = $event"
        ></input-field>

        <input-field
          v-model="password"
          @keydown.enter="loginUser"
          :error="errors.password"
          name="password"
          type="password"
          autocomplete="password"
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
          class="font-semibold leading-6 text-approx-teal-600 hover:text-approx-teal-500"
        >
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ValidationError } from "yup";
import { useRouter } from "vue-router";

import { validateFields } from "@/utils/validation/validateFieldsUtil";
import {
  getValidationErrors,
  getErrorsFromResponse,
} from "@/utils/validation/getValidationErrors";
import { setUserToken } from "@/utils/authUtil";
import {
  getUserStoredData,
  removeUserStoredData,
} from "@/utils/localStorageUtil";

import { useUserStore } from "@/stores/user";
import { httpClient } from "@/api";

import InputField from "@/components/kit/input/InputField.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import ViewLogo from "@/components/ViewLogo.vue";

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
    const validationData = {
      email: email.value,
      password: password.value,
    };
    await validateFields(validationData);
    errors.value = {};

    httpClient
      .post("login", { email: email.value, password: password.value })
      .then(async (response) => {
        const userToken = response.data.data.token;
        const userName = response.data.data.user.name;
        const userUploadLimit = response.data.data.user.upload_limit;

        removeUserStoredData();

        setUserToken(userToken);
        await userStore.setUserData(userName, email.value, userUploadLimit);

        await router.push({ name: "home" });
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
