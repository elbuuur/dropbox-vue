<template>
  <component class="svg-icon-size" :is="getFileTypeComponent(props.fileType)" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import FileTypeImgIcon from "@/components/kit/icon/types/FileTypeImgIcon.vue";
import FileTypeTxtIcon from "@/components/kit/icon/types/FileTypeTxtIcon.vue";
import FileTypeMusicIcon from "@/components/kit/icon/types/FileTypeMusicIcon.vue";
import FileTypeDocIcon from "@/components/kit/icon/types/FileTypeDocIcon.vue";
import FileTypeXlsIcon from "@/components/kit/icon/types/FileTypeXlsIcon.vue";
import FileTypeHtmlIcon from "@/components/kit/icon/types/FileTypeHtmlIcon.vue";
import FileTypeMp4Icon from "@/components/kit/icon/types/FileTypeMp4Icon.vue";
import FileTypePdfIcon from "@/components/kit/icon/types/FileTypePdfIcon.vue";
import FileTypePttIcon from "@/components/kit/icon/types/FileTypePttIcon.vue";

import FileTypeOtherIcon from "@/components/kit/icon/types/FileTypeOtherIcon.vue";

const props = defineProps<{
  fileType: string;
}>();

const getFileTypeComponent = (fileType: string) => {
  switch (fileType) {
    case "jpg":
    case "webp":
    case "jpeg":
    case "png":
      return FileTypeImgIcon;

    case "mp3":
    case "aac":
      return FileTypeMusicIcon;

    case "mp4":
      return FileTypeMp4Icon;

    case "txt":
      return FileTypeTxtIcon;
    case "doc":
      return FileTypeDocIcon;
    case "xls":
      return FileTypeXlsIcon;
    case "html":
      return FileTypeHtmlIcon;
    case "pdf":
      return FileTypePdfIcon;
    case "ptt":
      return FileTypePttIcon;

    default:
      return FileTypeOtherIcon;
  }
};
</script>
