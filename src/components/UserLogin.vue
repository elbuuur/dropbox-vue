<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
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

        <error-text
          v-if="errors.httpError"
          :error-text="errors.httpError"
        ></error-text>
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
import { ref } from "vue";
import { validateUserFields } from "@/utils/validation/validateUserFields";
import { getErrors } from "@/utils/validation/getErrors";
import { ValidationError } from "yup";
import { setUserToken } from "@/utils/userAuth";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { httpClient } from "@/api";
import InputField from "@/components/kit/input/InputField.vue";
import ErrorText from "@/components/kit/text/ErrorText.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";

const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});
const userStore = useUserStore();
const router = useRouter();

async function loginUser() {
  try {
    await validateUserFields(email.value, password.value);
    errors.value = {};

    httpClient
      .post("login", { email: email.value, password: password.value })
      .then((response) => {
        const userToken = response.data.data.token;
        const userName = response.data.data.user.name;
        const userUploadLimit = response.data.data.user.upload_limit;

        setUserToken(userToken);
        userStore.setUserData(userName, userUploadLimit);

        router.push({ name: "home" });
      })
      .catch((error) => {
        errors.value = { httpError: error.response.data.message };
      });
  } catch (error) {
    if (error instanceof ValidationError) {
      errors.value = getErrors(error);
    }
  }
}
</script>
