<template>
  <svg width="24" height="24" viewBox="0 0 1024 1024" fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z"
        fill="#FFA000"
      />
      <path
        d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z"
        fill="#FFCA28"
      />
    </g>
  </svg>
  <div class="px-3 mr-auto text-sm">{{ folder.folder_name }}</div>
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
        @click.stop="openFolderChangeModal(folder.id)"
        text="Edit"
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          ></path>
        </svg>
      </popup-action-button>
      <hr class="m-0.5" />
      <popup-action-button
        @click.stop="moveFolderToTrash(folder.id)"
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
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useEventListener } from "@/composables/useEventListener";

import PopupActionButton from "@/components/kit/button/PopupActionButton.vue";

type FolderProps = {
  folder: Record<string, string>;
};

const props = defineProps<FolderProps>();
const emit = defineEmits<{
  (e: "openFolderChangeModal", value: number): void;
  (e: "moveFolderToTrash", value: number): void;
}>();
const isOpenMenu = ref(false);

function openFolderChangeModal(folderId: number) {
  isOpenMenu.value = false;
  emit("openFolderChangeModal", folderId);
}

function moveFolderToTrash(folderId: number) {
  isOpenMenu.value = false;
  emit("moveFolderToTrash", folderId);
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
