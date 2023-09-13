<template>
  <folder-type-icon></folder-type-icon>
  <div class="px-3 mr-auto text-sm text-gray-800 single-line-ellipsis">
    {{ folder.folder_name }}
  </div>
  <div data-entity-menu class="relative">
    <div @click="isOpenMenu = !isOpenMenu" class="cursor-pointer">
      <menu-action-icon></menu-action-icon>
    </div>

    <div
      v-if="isOpenMenu"
      class="mt-1 absolute bg-white text-gray-600 origin-top-right right-0 mt-2 w-56 shadow-lg overflow-hidden"
    >
      <popup-action-button @click.stop="openFolderChangeModal()" text="Rename">
        <rename-action-icon></rename-action-icon>
      </popup-action-button>

      <hr class="m-0.5" />

      <popup-action-button text="Info">
        <info-action-icon></info-action-icon>
      </popup-action-button>

      <hr class="m-0.5" />
      <popup-action-button
        @click.stop="moveFolderToTrash()"
        text="Move to trash"
      >
        <move-to-trash-action-icon></move-to-trash-action-icon>
      </popup-action-button>
    </div>
  </div>

  <c-c-storage-folder-item-change-name-form
    v-if="visibleChangeForm"
    @visible-change-modal="visibleChangeForm = $event"
    :folder-data="folderData"
    @update-folder-name="updateFolderName($event)"
  ></c-c-storage-folder-item-change-name-form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import { useEventListener } from "@/composables/useEventListener";
import { httpClient } from "@/api";
import { useFlashNotificationStore } from "@/stores/flashNotifications";

import PopupActionButton from "@/components/kit/button/PopupActionButton.vue";
import CCStorageFolderItemChangeNameForm from "@/modules/storage/components/folder/CCStorageFolderItemChangeNameForm.vue";

import FolderTypeIcon from "@/components/kit/icon/FolderTypeIcon.vue";
import RenameActionIcon from "@/components/kit/icon/actions/RenameActionIcon.vue";
import InfoActionIcon from "@/components/kit/icon/actions/InfoActionIcon.vue";
import MoveToTrashActionIcon from "@/components/kit/icon/actions/MoveToTrashActionIcon.vue";
import MenuActionIcon from "@/components/kit/icon/actions/MenuActionIcon.vue";

type FolderProps = {
  folder: Record<string, string | number>;
};

interface folderDataInterface {
  id: number;
  name: string;
}

const props = defineProps<FolderProps>();
const emit = defineEmits<{
  (e: "updateFoldersAfterMoveToTrash", value: number): void;
  (e: "updateFolderName", value: folderDataInterface): void;
}>();

const isOpenMenu = ref(false);
const visibleChangeForm = ref(false);
const notificationStore = useFlashNotificationStore();

const initialFolderData: folderDataInterface = {
  id: 0,
  name: "",
};

const folderData = ref(initialFolderData);

function openFolderChangeModal() {
  isOpenMenu.value = false;
  visibleChangeForm.value = true;

  folderData.value = {
    id: props.folder.id as number,
    name: props.folder.folder_name as string,
  };
}

function updateFolderName(folderData: folderDataInterface) {
  emit("updateFolderName", folderData);
  visibleChangeForm.value = false;
}

function moveFolderToTrash() {
  isOpenMenu.value = false;

  const folderId = props.folder.id as number;

  httpClient
    .delete(`folder/${folderId}`)
    .then(async () => {
      emit("updateFoldersAfterMoveToTrash", folderId);
    })
    .catch((error) => {
      const errorText = error.response.data.message;
      notificationStore.addNotification({
        type: "error",
        text: errorText,
        time: 5000,
      });
    });
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
