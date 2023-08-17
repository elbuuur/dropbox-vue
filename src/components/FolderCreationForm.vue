<template>
  <input-field
    v-model="folderName"
    @keydown.enter="createFolder"
    name="folderName"
    type="text"
    placeholder="Untitled"
    :error="errors.folderName"
    @reset-validation="errors.folderName = $event"
  ></input-field>
  <div class="mt-6 flex justify-end gap-6">
    <text-link-button @click="closeModal" text="Cancel"></text-link-button>
    <text-link-button @click="createFolder" text="Create"></text-link-button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { ValidationError } from "yup";

import { httpClient } from "@/api";
import {
  getErrorsFromResponse,
  getValidationErrors,
} from "@/utils/validation/getValidationErrors";
import { validateFields } from "@/utils/validation/validateFieldsUtil";

import InputField from "@/components/kit/input/InputField.vue";
import TextLinkButton from "@/components/kit/button/TextLinkButton.vue";

const folderName = ref("");
const errors = ref<Record<string, string>>({});
const emit = defineEmits<{
  (e: "visibleModal", value: boolean): void;
}>();

async function createFolder() {
  try {
    await validateFields({ folderName: folderName.value });
    httpClient
      .post("folder/create", { folder_name: folderName.value })
      .then(async (response) => {
        closeModal();
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

function closeModal() {
  emit("visibleModal", false);
}
</script>
