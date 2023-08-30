<template>
  <div class="mb-4 text-gray-700 mt-10">Files</div>
  <div class="column-4">
    <div
      v-for="file of files"
      :key="file.id"
      class="flex flex-col gap-2 justify-between bg-white rounded-md p-3 cursor-pointer transition duration-500 ease-in-out hover:shadow hover:bg-gray-200"
    >
      <c-c-storage-file-item
        :file="file"
        @open-file-change-modal="emit('openFileChangeModal', $event)"
        @move-file-to-trash="emit('moveFileToTrash', $event)"
      ></c-c-storage-file-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import CCStorageFileItem from "@/modules/storage/components/file/CCStorageFileItem.vue";

const props = defineProps<{
  files: Array<Record<string, string>>;
}>();
const emit = defineEmits<{
  (e: "openFileChangeModal", value: number): void;
  (e: "moveFileToTrash", value: number): void;
}>();
</script>
