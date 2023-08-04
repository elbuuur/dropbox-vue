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
          @keydown.enter="createUser"
          :error="errors.userName"
          name="userName"
          type="string"
          title="Your name"
          @reset-validation="errors.userName = $event"
        ></input-field>

        <input-field
          v-model="email"
          @keydown.enter="createUser"
          :error="errors.email"
          name="email"
          type="email"
          title="Email address"
          @reset-validation="errors.email = $event"
        ></input-field>

        <input-field
          v-model="password"
          @keydown.enter="createUser"
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
          <base-button @click="createUser" text="Create"></base-button>
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
import { validateUserFields } from "@/utils/validation/validateUserFields";
import { getErrors } from "@/utils/validation/getErrors";
import { ValidationError } from "yup";
import { useRouter } from "vue-router";
import { httpClient } from "@/api";
import InputField from "@/components/kit/input/InputField.vue";
import ErrorText from "@/components/kit/text/ErrorText.vue";
import BaseButton from "@/components/kit/button/BaseButton.vue";

const userName = ref("");
const email = ref("");
const password = ref("");
const errors = ref<Record<string, string>>({});
const router = useRouter();

async function createUser() {
  try {
    await validateUserFields(userName.value, email.value, password.value);
    errors.value = {};

    httpClient
      .post("register", {
        name: userName.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response);
        // not done
        // router.push({ name: "login" });
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
