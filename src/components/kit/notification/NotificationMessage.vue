<template>
  <span
    :class="notificationClasses"
    class="mt-1 w-full inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  notificationType?: "success" | "error" | "warning";
}>();

const notificationClasses = computed(() => {
  let baseClasses =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1";

  switch (props.notificationType) {
    case "success":
      return baseClasses + " bg-green-50 text-green-700 ring-green-600/20";
    case "error":
      return baseClasses + " bg-red-50 text-red-700 ring-red-600/20";
    case "warning":
      return baseClasses + " bg-yellow-50 text-yellow-700 ring-yellow-600/20";
    default:
      return baseClasses;
  }
});
</script>
