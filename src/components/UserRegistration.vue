<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <view-logo></view-logo>
      <h2 class="mt-10 text-center">Create account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <input-field
          v-model="user_name"
          @keydown.enter="registrationUser"
          :error="errors.user_name"
          name="userName"
          type="text"
          title="Your name"
          @reset-validation="errors.user_name = $event"
        ></input-field>

        <input-field
          v-model="email"
          @keydown.enter="registrationUser"
          :error="errors.email"
          name="email"
          type="email"
          autocomplete="email"
          title="Email address"
          @reset-validation="errors.email = $event"
        ></input-field>

        <input-field
          v-model="password"
          @keydown.enter="registrationUser"
          :error="errors.password"
          name="password"
          type="password"
          autocomplete="password"
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
          class="font-semibold leading-6 text-approx-teal hover:text-approx-teal-500"
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
import { validateFields } from "@/utils/validation/validateFieldsUtil";
import {
  getValidationErrors,
  getErrorsFromResponse,
} from "@/utils/validation/getValidationErrors";
import { httpClient } from "@/api";
import { saveUserStorageData } from "@/utils/localStorageUtil";
import InputField from "@/components/kit/input/InputField.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import ViewLogo from "@/components/ViewLogo.vue";

const user_name = ref("");
const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});
const router = useRouter();

async function registrationUser() {
  try {
    const validationData = {
      user_name: user_name.value,
      email: email.value,
      password: password.value,
    };
    await validateFields(validationData);
    errors.value = {};

    httpClient
      .post("register", {
        name: user_name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        saveUserStorageData(user_name.value, email.value);
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
