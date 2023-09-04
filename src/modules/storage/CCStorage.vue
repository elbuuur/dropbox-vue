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
    @open-folder-change-modal="openChangeModal('folder', $event, false)"
    @move-folder-to-trash="moveFolderToTrash($event)"
  ></c-c-storage-folder-list>

  <c-c-storage-file-list
    v-if="files"
    :files="files"
    @open-file-name-change-modal="openChangeModal('file', $event, false)"
    @open-file-shelf-life-change-modal="openChangeModal('file', $event, true)"
    @move-file-to-trash="moveFileToTrash($event)"
  ></c-c-storage-file-list>

  <c-c-storage-change-entity-form
    v-if="visibleChangeModal"
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
const files = ref<Array<Record<string, string | number | null>>>();
const errors = ref<Record<string, string>>({});
const visibleChangeModal = ref(false);

loadStorageData();

const entityFormData = ref({
  changeableEntityField: "",
  id: 0,
  name: "",
  title: "",
  shelfLife: false,
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

function openChangeModal(
  entityType: string,
  entityId: number,
  shelfLife: boolean
) {
  if (!entityId && !entityType) {
    console.log("entityId or entityType is empty (openChangeModal)");
    return;
  }

  visibleChangeModal.value = true;

  collectFormData(entityType, entityId, shelfLife);
}

function collectFormData(
  entityType: string,
  entityId: number,
  shelfLife: boolean
) {
  let entityName = "";
  let title = `Change ${entityType} name`;
  let changeableEntityField = "";

  if (entityType == "folder" && folders.value) {
    let folder = folders.value.find((item) => item?.id == entityId);

    entityName = folder?.folder_name as string;
    changeableEntityField = "folder_name";
  }

  if (entityType == "file" && files.value) {
    let file = files.value.find((item) => item?.id == entityId);

    entityName = file?.name as string;
    changeableEntityField = "file_name";
  }

  if (shelfLife) {
    title = "Change file's retention days";
    changeableEntityField = "shelf_life";
  }

  entityFormData.value = {
    changeableEntityField: changeableEntityField,
    id: entityId,
    name: entityName,
    title: title,
    shelfLife: shelfLife,
  };
}

function updateEntity(updateEntityData: {
  type: string;
  id: number;
  name: string;
  shelf_life: string | null;
}) {
  if (updateEntityData.type === "folder") {
    updateEntityFolders(updateEntityData);
  } else if (updateEntityData.type === "file") {
    updateEntityFiles(updateEntityData);
  }
  visibleChangeModal.value = false;
}

function updateEntityFolders(updateEntityData: {
  type: string;
  id: number;
  name: string;
}) {
  if (!Array.isArray(folders.value)) {
    return;
  }

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

function updateEntityFiles(updateEntityData: {
  type: string;
  id: number;
  name: string;
  shelf_life: string | null;
}) {
  if (!Array.isArray(files.value)) {
    return;
  }

  files.value = files.value.map((file) => {
    if (file.id === updateEntityData.id) {
      return {
        ...file,
        file_name: updateEntityData.name,
        shelf_life: updateEntityData.shelf_life
          ? updateEntityData.shelf_life
          : null,
      };
    }
    return file;
  });
}

function moveFolderToTrash(folderId: number) {
  httpClient
    .delete(`folder/${folderId}`)
    .then(async () => {
      if (!folders.value) {
        return;
      }

      folders.value = folders.value.filter((folder) => folder.id !== folderId);
    })
    .catch((error) => {
      errors.value = error.response.data.message;
    });
}

function moveFileToTrash($fileId: number) {
  httpClient
    .delete(`file/${$fileId}`)
    .then(async () => {
      if (!files.value) {
        return;
      }

      files.value = files.value.filter((file) => file.id !== $fileId);
    })
    .catch((error) => {
      errors.value = error.response.data.message;
    });
}
</script>
