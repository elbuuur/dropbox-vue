<template>
  <Teleport to="body">
    <div v-if="visible" class="dialog" role="dialog" aria-modal="true">
      <div class="dialog--overlay">
        <div class="dialog--content-wrap">
          <div data-dialog-body class="dialog--content p-4 w-80">
            <h3 class="mb-6 font-medium">{{ title }}</h3>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import useDialogClickOutside from "@/composables/useDialogClickOutside";

const props = defineProps<{
  visible: boolean;
  title: string;
}>();

const visible = computed(() => {
  return props.visible;
});

const emit = defineEmits<{
  (e: "closeDialog", value: boolean): void;
}>();

useDialogClickOutside("[data-dialog-body]", emit);
</script>
