<template>
  <div class="flex justify-between items-center">
    <file-type-icon
      class="max-h-4"
      :file-type="file.extension"
    ></file-type-icon>
    <div class="px-3 mr-auto text-sm single-line-ellipsis">
      {{ file.file_name }}
    </div>
    <div data-folder-menu class="relative">
      <div @click="isOpenMenu = !isOpenMenu">
        <svg
          fill="currentColor"
          class="w-5 h-5"
          style=""
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          ></path>
        </svg>
      </div>

      <div
        v-if="isOpenMenu"
        class="mt-1 absolute bg-white text-gray-600 origin-top-right right-0 mt-2 w-56 shadow-lg overflow-hidden"
      >
        <popup-action-button
          @click.stop="openFileChangeModal(file.id)"
          text="Edit"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </popup-action-button>
        <popup-action-button text="Download">
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" style="">
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </popup-action-button>
        <hr class="m-0.5" />
        <popup-action-button
          @click.stop="moveFileToTrash(file.id)"
          text="Move to trash"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </popup-action-button>
      </div>
    </div>
  </div>
  <img
    :src="file.thumb"
    class="h-40 rounded-md object-cover"
    :class="{ 'bg-gray-200': !file.thumb }"
    :alt="file.file_name"
  />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useEventListener } from "@/composables/useEventListener";

import FileTypeIcon from "@/components/kit/icon/FileTypeIcon.vue";
import PopupActionButton from "@/components/kit/button/PopupActionButton.vue";

type FileProps = {
  file: Record<string, string>;
};

const props = defineProps<FileProps>();
const emit = defineEmits<{
  (e: "openFileChangeModal", value: number): void;
  (e: "moveFileToTrash", value: number): void;
}>();
const isOpenMenu = ref(false);

function openFileChangeModal(folderId: number) {
  isOpenMenu.value = false;
  emit("openFileChangeModal", folderId);
}

function moveFileToTrash(folderId: number) {
  isOpenMenu.value = false;
  emit("moveFileToTrash", folderId);
}

const handleClickMenuOutside = (event: MouseEvent) => {
  const activeTrigger = (event.target as HTMLElement).closest(
    "[data-folder-menu]"
  );

  if (isOpenMenu.value && !activeTrigger) {
    isOpenMenu.value = false;
  }
};

useEventListener(document, "click", handleClickMenuOutside);
</script>
