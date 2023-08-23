<template>
  <c-c-storage-folder-list
    v-if="folders"
    :folders="folders"
    @open-folder-change-modal="openChangeModal('folder', $event)"
  ></c-c-storage-folder-list>

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
import { ref } from "vue";

import { httpClient } from "@/api";

import CCStorageFolderList from "@/modules/storage/components/folder/CCStorageFolderList.vue";
import CCStorageChangeEntityForm from "@/modules/storage/components/CCStorageChangeEntityForm.vue";

const folders = ref<Array<Record<string, string | number>>>();
const files = ref([]);
const errors = ref<Record<string, string>>({});
const visibleChangeModal = ref(false);

const entityFormData = ref({
  entityType: "",
  id: 0,
  name: "",
  title: "",
});

httpClient
  .post("home")
  .then(async (response) => {
    const data = response.data.data;
    if (data.folders) {
      folders.value = data.folders;
    }
  })
  .catch((error) => {
    console.log(error, "error");
    errors.value = error.response.data.message;
  });

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
</script>
