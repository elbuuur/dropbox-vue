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
        <menu-action-icon></menu-action-icon>
      </div>

      <div
        v-if="isOpenMenu"
        class="mt-1 absolute bg-white text-gray-600 origin-top-right right-0 mt-2 w-56 shadow-lg overflow-hidden"
      >
        <popup-action-button
          @click.stop="openFileNameChangeModal(file.id)"
          text="Rename"
        >
          <rename-action-icon></rename-action-icon>
        </popup-action-button>

        <popup-action-button
          @click.stop="openFileShelfLifeChangeModal(file.id)"
          text="Change retention days"
        >
          <change-date-action-icon></change-date-action-icon>
        </popup-action-button>

        <popup-action-button text="Move to...">
          <move-file-action-icon></move-file-action-icon>
        </popup-action-button>

        <hr class="m-0.5" />

        <popup-action-button text="Download">
          <download-action-icon></download-action-icon>
        </popup-action-button>

        <hr class="m-0.5" />

        <popup-action-button text="Info">
          <info-action-icon></info-action-icon>
        </popup-action-button>

        <hr class="m-0.5" />

        <popup-action-button
          @click.stop="moveFileToTrash(file.id)"
          text="Move to trash"
        >
          <move-to-trash-action-icon></move-to-trash-action-icon>
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

import PopupActionButton from "@/components/kit/button/PopupActionButton.vue";

import FileTypeIcon from "@/components/kit/icon/FileTypeIcon.vue";
import RenameActionIcon from "@/components/kit/icon/actions/RenameActionIcon.vue";
import InfoActionIcon from "@/components/kit/icon/actions/InfoActionIcon.vue";
import MoveToTrashActionIcon from "@/components/kit/icon/actions/MoveToTrashActionIcon.vue";
import MenuActionIcon from "@/components/kit/icon/actions/MenuActionIcon.vue";
import ChangeDateActionIcon from "@/components/kit/icon/actions/ChangeDateActionIcon.vue";
import MoveFileActionIcon from "@/components/kit/icon/actions/MoveFileActionIcon.vue";
import DownloadActionIcon from "@/components/kit/icon/actions/DownloadActionIcon.vue";

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
