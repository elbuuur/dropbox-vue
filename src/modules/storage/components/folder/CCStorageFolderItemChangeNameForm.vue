<template>
  <modal-wrapper
    title="Change folder name"
    :visible="true"
    @close-dialog="emit('visibleChangeModal', false)"
  >
    <input-field
      ref="inputFieldRef"
      @keydown.enter="updateFolderName(folderData.id)"
      v-model="entityModel"
      type="text"
      name="folder"
      :error="errors.folder_name"
      @reset-validation="errors[folder_name] = $event"
    ></input-field>
    <div class="mt-6 flex justify-end gap-6">
      <text-link-button
        @click="emit('visibleChangeModal', false)"
        text="Cancel"
      ></text-link-button>
      <text-link-button
        @click="updateFolderName(folderData.id)"
        text="Update"
      ></text-link-button>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue";

import ModalWrapper from "@/components/kit/modal/ModalWrapper.vue";
import InputField from "@/components/kit/input/InputField.vue";
import TextLinkButton from "@/components/kit/button/TextLinkButton.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import { validateFields } from "@/utils/validation/validateFieldsUtil";
import { ValidationError } from "yup";
import {
  getErrorsFromResponse,
  getValidationErrors,
} from "@/utils/validation/getValidationErrors";
import { httpClient } from "@/api";

const props = defineProps<{
  folderData: {
    id: number;
    name: string;
  };
}>();

const inputFieldRef = ref<InstanceType<typeof InputField> | null>(null);

const emit = defineEmits<{
  (e: "visibleChangeModal", value: boolean): void;
  (
    e: "updateFolderName",
    value: {
      id: number;
      name: string;
    }
  ): void;
}>();

const entityModel = ref(props.folderData.name);
const errors = ref<Record<string, string>>({});

onMounted(() => {
  inputFieldRef.value?.handleFocus();
});

async function updateFolderName(folderId: number) {
  httpClient
    .put(`folder/${folderId}`, {
      folder_name: entityModel.value,
    })
    .then(async (response) => {
      const folderName = response.data.data.folder.folder_name;

      emit("updateFolderName", {
        id: folderId,
        name: folderName,
      });
    })
    .catch((error) => {
      errors.value = getErrorsFromResponse(error.response.data.data);
    });
}
</script>
