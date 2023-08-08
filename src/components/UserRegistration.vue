<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Create account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <input-field
          v-model="userName"
          @keydown.enter="registrationUser"
          :error="errors.userName"
          name="userName"
          type="text"
          title="Your name"
          @reset-validation="errors.userName = $event"
        ></input-field>

        <input-field
          v-model="email"
          @keydown.enter="registrationUser"
          :error="errors.email"
          name="email"
          type="email"
          title="Email address"
          @reset-validation="errors.email = $event"
        ></input-field>

        <input-field
          v-model="password"
          @keydown.enter="registrationUser"
          :error="errors.password"
          name="password"
          type="password"
          title="Password"
          @reset-validation="errors.password = $event"
        ></input-field>

        <notification-message v-if="errors.httpError" notification-type="error">
          {{ errors.httpError }}
        </notification-message>

        <div>
          <base-button @click="registrationUser" text="Create"></base-button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have an account?
        <router-link
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ValidationError } from "yup";
import { useRouter } from "vue-router";
import { validateUserFields } from "@/utils/validation/validateUserFields";
import {
  getValidationErrors,
  getErrorsFromResponse,
} from "@/utils/validation/getValidationErrors";
import { httpClient } from "@/api";
import { saveUserStorageData } from "@/utils/localStorageUtils";
import InputField from "@/components/kit/input/InputField.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";

const userName = ref("");
const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});
const router = useRouter();

async function registrationUser() {
  try {
    await validateUserFields(userName.value, email.value, password.value);
    errors.value = {};

    httpClient
      .post("register", {
        name: userName.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        saveUserStorageData(userName.value, email.value);
        router.push({ name: "login" });
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
