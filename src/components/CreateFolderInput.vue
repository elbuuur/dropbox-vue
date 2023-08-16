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
</template>

<script setup lang="ts">
import { ref } from "vue";

import { httpClient } from "@/api";
import {
  getErrorsFromResponse,
  getValidationErrors,
} from "@/utils/validation/getValidationErrors";
import { validateFields } from "@/utils/validation/validateFieldsUtil";

import InputField from "@/components/kit/input/InputField.vue";
import { ValidationError } from "yup";

const folderName = ref("");
const errors = ref<Record<string, string>>({});

async function createFolder() {
  try {
    await validateFields({ folderName: folderName.value });
    httpClient
      .post("folder/create", { folder_name: folderName.value })
      .then(async (response) => {
        //настроить вывод
        //подумать о том, как будет обновляться содержимое после добавления папки (составить роадмап)
        console.log(response);
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
