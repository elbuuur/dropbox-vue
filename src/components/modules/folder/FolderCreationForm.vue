<template>
  <modal-wrapper title="New folder" :visible="true">
    <input-field
      v-model="folder_name"
      @keydown.enter="createFolder"
      name="folder_name"
      type="text"
      placeholder="Untitled"
      :error="errors.folder_name"
      @reset-validation="errors.folder_name = $event"
    ></input-field>
    <div class="mt-6 flex justify-end gap-6">
      <text-link-button @click="closeModal" text="Cancel"></text-link-button>
      <text-link-button @click="createFolder" text="Create"></text-link-button>
    </div>
  </modal-wrapper>
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
import eventBus from "@/utils/eventBusUtil";

import InputField from "@/components/kit/input/InputField.vue";
import TextLinkButton from "@/components/kit/button/TextLinkButton.vue";
import ModalWrapper from "@/components/kit/modal/ModalWrapper.vue";

const folder_name = ref("");
const errors = ref<Record<string, string>>({});
const emit = defineEmits<{
  (e: "visibleModal", value: boolean): void;
}>();

async function createFolder() {
  try {
    await validateFields({ folder_name: folder_name.value });
    httpClient
      .post("folder/create", { folder_name: folder_name.value })
      .then(async (response) => {
        closeModal();
        eventBus.emit("updateStorage", true);
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
