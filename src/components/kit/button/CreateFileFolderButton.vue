<template>
  <button
    type="button"
    class="bg-selective-yellow p-4 gap-3 text-m font-semibold leading-6 text-white hover:bg-selective-yellow-500 focus-visible:outline-selective-yellow-600"
  >
    <svg
      fill="#fff"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
    </svg>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  text: string;
}>();
</script>
