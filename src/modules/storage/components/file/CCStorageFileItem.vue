<template>
  <div class="flex justify-between items-start">
    <file-type-icon
      class="max-h-4 mt-0.5"
      :file-type="file.extension"
    ></file-type-icon>
    <div class="px-3 mr-auto flex flex-col overflow-x-hidden">
      <div class="text-sm text-gray-800 single-line-ellipsis">
        {{ file.file_name }}
      </div>
    </div>

    <div data-entity-menu class="relative z-10">
      <div @click="isOpenMenu = !isOpenMenu" class="cursor-pointer">
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
          @click.stop="openFileNameChangeModal(file.id)"
          text="Rename"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </popup-action-button>

        <popup-action-button
          @click.stop="openFileShelfLifeChangeModal(file.id)"
          text="Change retention days"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </popup-action-button>

        <popup-action-button text="Move to...">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
              clip-rule="evenodd"
            ></path>
            <path
              d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
            ></path>
          </svg>
        </popup-action-button>

        <hr class="m-0.5" />

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

        <popup-action-button text="Info">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="invisible_box" data-name="invisible box">
                <rect width="48" height="48" fill="none" />
              </g>
              <g id="icons_Q2" data-name="icons Q2">
                <path
                  d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm2,32a2,2,0,0,1-4,0V22a2,2,0,0,1,4,0ZM24,16a2,2,0,1,1,2-2A2,2,0,0,1,24,16Z"
                />
              </g>
            </g>
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
  <div class="rounded-md bg-gray-200 w-full h-40 relative">
    <div
      v-if="file.shelf_life"
      class="text-xxs bg-selective-yellow text-white bg-opacity-80 px-1 w-fit rounded-md absolute top-0.5 left-0.5"
    >
      Stored until: <br />
      {{ file.shelf_life.split(" ")[0] }}
    </div>
    <img
      v-if="file.thumb"
      :src="file.thumb"
      class="rounded-md object-cover h-40 w-full"
      :alt="file.file_name"
    />
  </div>
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
  (e: "openFileNameChangeModal", value: number): void;
  (e: "moveFileToTrash", value: number): void;
  (e: "openFileShelfLifeChangeModal", value: number): void;
}>();
const isOpenMenu = ref(false);

function openFileNameChangeModal(fileId: number) {
  isOpenMenu.value = false;
  emit("openFileNameChangeModal", fileId);
}

function openFileShelfLifeChangeModal(fileId: number) {
  isOpenMenu.value = false;
  emit("openFileShelfLifeChangeModal", fileId);
}

function moveFileToTrash(fileId: number) {
  isOpenMenu.value = false;
  emit("moveFileToTrash", fileId);
}

const handleClickMenuOutside = (event: MouseEvent) => {
  const activeTrigger = (event.target as HTMLElement).closest(
    "[data-entity-menu]"
  );

  if (isOpenMenu.value && !activeTrigger) {
    isOpenMenu.value = false;
  }
};

useEventListener(document, "click", handleClickMenuOutside);
</script>
