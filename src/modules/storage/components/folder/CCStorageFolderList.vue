<template>
  <div class="mb-4 text-gray-700">Folders</div>
  <div class="column-4">
    <div
      v-for="folder of folders"
      :key="folder.id"
      class="flex items-center bg-white rounded-md p-3 cursor-pointer transition duration-500 ease-in-out hover:shadow hover:bg-gray-200"
    >
      <c-c-storage-folder-item
        :folder="folder"
        @update-folder-name="emit('updateFolderName', $event)"
        @update-folders-after-move-to-trash="
          emit('updateFoldersAfterMoveToTrash', $event)
        "
      ></c-c-storage-folder-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import CCStorageFolderItem from "@/modules/storage/components/folder/CCStorageFolderItem.vue";

const props = defineProps<{
  folders: Array<Record<string, string | number | null>>;
}>();

const emit = defineEmits<{
  (e: "updateFoldersAfterMoveToTrash", value: number): void;
  (
    e: "updateFolderName",
    value: {
      id: number;
      name: string;
    }
  ): void;
}>();
</script>
