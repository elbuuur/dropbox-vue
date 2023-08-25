<template>
  <modal-wrapper title="Upload files" :visible="true">
    <input-checkbox
      label-text="Set file retention days"
      checkbox-name="file-upload-checkbox"
      v-model="hasRetentionDays"
    ></input-checkbox>

    <input-field
      :disabled="!hasRetentionDays"
      v-model="fileRetentionDays"
      type="number"
      title="Enter file retention days"
      class="mt-2"
    ></input-field>

    <notification-message
      class="mt-2"
      v-if="hasRetentionDays"
      notification-type="warning"
    >
      File will be moved to trash after
      {{ fileRetentionDays }} days
    </notification-message>

    <input
      ref="filesInput"
      multiple
      @change="handleFileChange"
      class="cursor-pointer mt-6 relative block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-sm font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
      type="file"
      id="filesInput"
    />
    <span class="text-xs text-gray-500"
      >The max size of a single file is 20 MB.</span
    >

    <div class="mt-6 flex justify-end gap-6">
      <text-link-button @click="closeModal" text="Cancel"></text-link-button>
      <text-link-button @click="uploadFiles" text="Upload"></text-link-button>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
// записывать в стор данные по лимитам (метод на бэке обновлен)
// добавить валидацию по размеру файла на фронте
// посмотреть что там по кешу после заливки файлов

import { ref, defineProps, defineEmits } from "vue";

import { httpClient } from "@/api";
import eventBus from "@/utils/eventBusUtil";

import InputField from "@/components/kit/input/InputField.vue";
import InputCheckbox from "@/components/kit/input/InputCheckbox.vue";
import ModalWrapper from "@/components/kit/modal/ModalWrapper.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import TextLinkButton from "@/components/kit/button/TextLinkButton.vue";
import { getErrorsFromResponse } from "@/utils/validation/getValidationErrors";

const props = defineProps<{
  folderId?: number;
}>();

const emit = defineEmits<{
  (e: "visibleModal", value: boolean): void;
}>();

const filesInput = ref();
const hasRetentionDays = ref(false);
const fileRetentionDays = ref(30);
const errors = ref<Record<string, string>>({});

interface HttpData {
  file: FileList;
  folder_id?: number;
  shelf_life?: number;
}

function closeModal() {
  emit("visibleModal", false);
}

function uploadFiles() {
  let selectedFiles = document.querySelector("#filesInput") as HTMLInputElement;

  if (selectedFiles && selectedFiles.files) {
    let httpData: HttpData = {
      file: selectedFiles.files,
    };

    if (props.folderId) {
      httpData.folder_id = props.folderId;
    }

    if (hasRetentionDays.value) {
      httpData.shelf_life = fileRetentionDays.value;
    }

    httpClient
      .postForm("file/upload", httpData)
      .then(async () => {
        closeModal();
        eventBus.emit("updateStorage", true);
      })
      .catch((error) => {
        console.log(error.response.data);
        errors.value = getErrorsFromResponse(error.response.data);
      });
  } else {
    console.log("smth wrong");
  }
}
</script>
