<template>
  <view-loader v-if="isLoading"></view-loader>
  <div v-if="errors.value" class="w-max">
    <notification-message class="my-4" notification-type="error">
      {{ errors }}
    </notification-message>
  </div>
  <c-c-storage-folder-list
    v-if="folders"
    :folders="folders"
    @open-folder-change-modal="openChangeModal('folder', $event)"
    @move-folder-to-trash="moveFolderToTrash($event)"
  ></c-c-storage-folder-list>

  <c-c-storage-file-list
    v-if="files"
    :files="files"
    @open-file-change-modal="openChangeModal('file', $event)"
    @move-file-to-trash="moveFileToTrash($event)"
  ></c-c-storage-file-list>

  <c-c-storage-change-entity-form
    v-if="visibleChangeModal"
    title="title 23"
    :visible="visibleChangeModal"
    :entity-form-data="entityFormData"
    @visible-change-modal="visibleChangeModal = $event"
    @update-result="updateEntity($event)"
  ></c-c-storage-change-entity-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { httpClient } from "@/api";
import eventBus from "@/utils/eventBusUtil";

import ViewLoader from "@/components/modules/ViewLoader.vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import CCStorageFolderList from "@/modules/storage/components/folder/CCStorageFolderList.vue";
import CCStorageChangeEntityForm from "@/modules/storage/components/CCStorageChangeEntityForm.vue";
import CCStorageFileList from "@/modules/storage/components/file/CCStorageFileList.vue";

const isLoading = ref(false);
const folders = ref<Array<Record<string, string | number>>>();
const files = ref<Array<Record<string, string | number>>>();
const errors = ref<Record<string, string>>({});
const visibleChangeModal = ref(false);

loadStorageData();

const entityFormData = ref({
  entityType: "",
  id: 0,
  name: "",
  title: "",
});

eventBus.on("updateStorage", (e) => {
  loadStorageData();
});

function loadStorageData() {
  isLoading.value = true;
  httpClient
    .post("home")
    .then(async (response) => {
      const data = response.data.data;
      if (data.folders) {
        folders.value = data.folders;
      }
      if (data.files) {
        files.value = data.files;
      }
    })
    .catch((error) => {
      errors.value = error.response.data.message;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function openChangeModal(entityType: string, entityId: number) {
  visibleChangeModal.value = true;
  if (entityId && entityType) {
    let entityName = "";

    if (entityType == "folder" && folders.value) {
      let folder = folders.value.find((item) => item?.id == entityId);
      entityName = folder?.folder_name;
    } else {
      let file = files.value.find((item) => item?.id == entityId);
      entityName = file?.name;
    }

    entityFormData.value = {
      entityType: entityType,
      id: entityId,
      name: entityName,
      title: `Change ${entityType} name`,
    };
  }
}
function updateEntity(updateEntityData: {
  type: string;
  id: number;
  name: string;
}) {
  if (updateEntityData.type === "folder") {
    if (Array.isArray(folders.value)) {
      folders.value = folders.value.map((folder) => {
        if (folder.id === updateEntityData.id) {
          return {
            ...folder,
            folder_name: updateEntityData.name,
          };
        }
        return folder;
      });
    }
  }
  visibleChangeModal.value = false;
}

function moveFolderToTrash(folderId: number) {
  httpClient
    .delete(`folder/${folderId}`)
    .then(async () => {
      folders.value = folders.value.filter((folder) => folder.id !== folderId);
    })
    .catch((error) => {
      errors.value = error.response.data.message;
    });
}

function moveFileToTrash($fileId: number) {
  console.log("move to trash file");
}
</script>
