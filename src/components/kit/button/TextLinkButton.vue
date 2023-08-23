<template>
  <button
    type="button"
    class="font-semibold leading-6 text-approx-teal hover:text-approx-teal-500 border-none shadow-none text-sm"
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
