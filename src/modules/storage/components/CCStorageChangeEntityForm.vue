<template>
  <modal-wrapper
    :title="entityFormData.title"
    :visible="visible"
    @close-dialog="emit('visibleChangeModal', false)"
  >
    <notification-message
      v-if="props.entityFormData.shelfLife"
      notification-type="warning"
      class="mb-4"
    >
      When you change the storage period of a file, the new duration begins from
      the moment you made the change, not from the initial upload date. <br />
      In other words, the new storage period is effective from the current date
      and continues for the specified number of days.
    </notification-message>

    <input-field
      @keydown.enter="updateEntityField(entityFormData.id)"
      v-model="entityModel"
      :type="typeInput"
      :name="entityFormData.changeableEntityField"
      :error="errors[props.entityFormData.changeableEntityField]"
      @reset-validation="
        errors[props.entityFormData.changeableEntityField] = $event
      "
      :auto-focus-and-select="true"
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
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import { validateFields } from "@/utils/validation/validateFieldsUtil";
import { ValidationError } from "yup";
import {
  getErrorsFromResponse,
  getValidationErrors,
} from "@/utils/validation/getValidationErrors";
import { httpClient } from "@/api";

const props = defineProps<{
  visible: boolean;
  entityFormData: {
    changeableEntityField: string;
    id: number;
    name: string;
    title: string;
    shelfLife: false;
  };
}>();

const typeInput = props.entityFormData.shelfLife ? "number" : "text";

const emit = defineEmits<{
  (e: "visibleChangeModal", value: boolean): void;
  (
    e: "updateResult",
    value: {
      type: string;
      id: number;
      name: string;
      shelf_life: string | null;
    }
  ): void;
}>();

const entityModel = ref(props.entityFormData.name);
const errors = ref<Record<string, string>>({});

async function updateEntityField(entityId: number) {
  try {
    console.log(props.entityFormData.changeableEntityField);
    await validateFields({
      [props.entityFormData.changeableEntityField]: entityModel.value,
    });

    selectUpdateType({
      type: props.entityFormData.changeableEntityField, //file / folder / shelf life
      id: entityId,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      errors.value = getValidationErrors(error);
    }
  }
}

function selectUpdateType(entityData: { type: string; id: number }) {
  if (entityData.type === "folder_name") {
    updateFolderName(entityData.id);
  } else if (entityData.type === "file_name") {
    updateFileName(entityData.id);
  } else {
    updateFileShelfLife(entityData.id);
  }
}

async function updateFileShelfLife(fileId: number) {
  httpClient
    .put(`file/${fileId}`, {
      shelf_life: entityModel.value,
    })
    .then(async (response) => {
      const fileName = response.data.data.file.file_name;
      const shelfLife = response.data.data.file.shelf_life;
      emit("updateResult", {
        type: "file",
        id: fileId,
        name: fileName,
        shelf_life: shelfLife,
      });
    })
    .catch((error) => {
      errors.value = getErrorsFromResponse(error.response.data.data);
    });
}

async function updateFileName(fileId: number) {
  httpClient
    .put(`file/${fileId}`, {
      name: entityModel.value,
    })
    .then(async (response) => {
      const fileName = response.data.data.file.file_name;
      emit("updateResult", {
        type: "file",
        id: fileId,
        name: fileName,
      });
    })
    .catch((error) => {
      errors.value = getErrorsFromResponse(error.response.data.data);
    });
}

async function updateFolderName(folderId: number) {
  httpClient
    .put(`folder/${folderId}`, {
      folder_name: entityModel.value,
    })
    .then(async (response) => {
      const folderName = response.data.data.folder.folder_name;
      emit("updateResult", {
        type: "folder",
        id: folderId,
        name: folderName,
        // return shelf life
      });
    })
    .catch((error) => {
      errors.value = getErrorsFromResponse(error.response.data.data);
    });
}
</script>
