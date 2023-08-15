<template>
  <Teleport to="body">
    <div v-if="visible" class="dialog" role="dialog" aria-modal="true">
      <div class="dialog--overlay">
        <div
          :style="{ top: clickPosition.y + 'px', left: clickPosition.x + 'px' }"
          dialog-body
          class="dialog--content"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRef } from "vue";
import useDialogClickOutside from "@/composables/useDialogClickOutside";

interface ClickPositionInterface {
  x: number;
  y: number;
}

const props = defineProps<{
  visible?: boolean;
  clickInfo: ClickPositionInterface;
}>();

const clickPosition = toRef(props, "clickInfo");
const visible = computed(() => {
  return props.visible;
});
const emit = defineEmits<{
  (e: "closeDialog", value: boolean): void;
}>();

useDialogClickOutside("[dialog-body]", emit);
</script>
