<template>
  <button
    type="button"
    class="w-full bg-approx-teal px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-approx-teal-500 focus-visible:outline-indigo-600"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  text: string;
}>();
</script>
