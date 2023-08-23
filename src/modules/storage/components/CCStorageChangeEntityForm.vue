<template>
  <modal-wrapper
    :title="entityFormData.title"
    :visible="visible"
    @close-dialog="emit('visibleChangeModal', false)"
  >
    <input-field
      @keydown.enter="updateEntityField(entityFormData.id)"
      v-model="entityModel"
      type="text"
      :name="entityFormData.entityType"
      :placeholder="entityFormData.name"
      :error="errors[entityFieldName]"
      @reset-validation="errors[entityFieldName] = $event"
    ></input-field>
    <div class="mt-6 flex justify-end gap-6">
      <text-link-button
        @click="emit('visibleChangeModal', false)"
        text="Cancel"
      ></text-link-button>
      <text-link-button
        @click="updateEntityField(entityFormData.id)"
        text="Update"
      ></text-link-button>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import ModalWrapper from "@/components/kit/modal/ModalWrapper.vue";
import InputField from "@/components/kit/input/InputField.vue";
import TextLinkButton from "@/components/kit/button/TextLinkButton.vue";
import { validateFields } from "@/utils/validation/validateFieldsUtil";
import { ValidationError } from "yup";
import {
  getErrorsFromResponse,
  getValidationErrors,
} from "@/utils/validation/getValidationErrors";
import { httpClient } from "@/api";

const props = defineProps<{
  title: string;
  visible: boolean;
  entityFormData: {
    entityType: string;
    id: number;
    name: string;
    title: string;
  };
}>();

const emit = defineEmits<{
  (e: "visibleChangeModal", value: boolean): void;
  (
    e: "updateResult",
    value: {
      type: string;
      id: number;
      name: string;
    }
  ): void;
}>();

const entityModel = ref("");
const errors = ref<Record<string, string>>({});
const entityFieldName =
  props.entityFormData.entityType === "folder" ? "folder_name" : "file_name";

async function updateEntityField(entityId: number) {
  try {
    await validateFields({ [entityFieldName]: entityModel.value });

    selectUpdateType({
      type: props.entityFormData.entityType,
      id: entityId,
      name: entityModel.value,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      errors.value = getValidationErrors(error);
    }
  }
}

function selectUpdateType(updateEntityData: {
  type: string;
  id: number;
  name: string;
}) {
  if (updateEntityData.type === "folder") {
    updateFolderName(updateEntityData);
  } else if (updateEntityData.type === "file") {
    console.log("update file");
  }
}

async function updateFolderName(updateEntityData: {
  type: string;
  id: number;
  name: string;
}) {
  httpClient
    .put(`folder/${updateEntityData.id}`, {
      folder_name: updateEntityData.name,
    })
    .then(async () => {
      emit("updateResult", updateEntityData);
    })
    .catch((error) => {
      errors.value = getErrorsFromResponse(error.response.data.data);
    });
}
</script>
