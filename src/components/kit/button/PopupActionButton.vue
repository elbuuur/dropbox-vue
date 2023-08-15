<template>
  <button
    class="flex items-center gap-4 py-1.5 px-5 w-full min-w-max justify-start border-none shadow-none hover:bg-gray-300 rounded-none"
  >
    <div class="w-4">
      <slot></slot>
    </div>
    <span class="text-sm text-gray-600 rounded-lg dark:text-white">
      {{ props.text }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  text: string;
}>();
</script>

<style scoped></style>
