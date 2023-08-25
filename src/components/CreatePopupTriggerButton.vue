<template>
  <button
    ref="openPopupButton"
    @click.stop="openPopup"
    type="button"
    class="bg-selective-yellow py-2 px-4 gap-3 text-sm font-semibold leading-6 text-white hover:bg-selective-yellow-500 focus-visible:outline-selective-yellow-600"
  >
    <svg
      fill="#fff"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      focusable="false"
    >
      <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
    </svg>
    {{ props.text }}
  </button>
  <popup-wrapper
    v-if="visiblePopup"
    :visible="visiblePopup"
    :click-info="clickPosition"
    @close-dialog="closeDialog"
  >
    <create-folder-button @visible-dialog="closeDialog"></create-folder-button>
    <file-upload-button @visible-dialog="closeDialog"></file-upload-button>
  </popup-wrapper>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import PopupWrapper from "@/components/kit/popup/PopupWrapper.vue";
import CreateFolderButton from "@/components/modules/folder/CreateFolderButton.vue";
import FileUploadButton from "@/components/modules/file/FileUploadButton.vue";

const props = defineProps<{
  text: string;
}>();

const openPopupButton = ref<HTMLButtonElement | null>(null);
const visiblePopup = ref(false);
const clickPosition = ref({
  x: 0,
  y: 0,
});

const openPopup = () => {
  visiblePopup.value = true;
  if (openPopupButton.value) {
    let rect = openPopupButton.value.getBoundingClientRect();

    clickPosition.value = {
      x: rect.left,
      y: rect.top,
    };
  }
};
const closeDialog = () => {
  visiblePopup.value = false;
};
</script>
