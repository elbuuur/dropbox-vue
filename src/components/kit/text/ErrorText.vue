<template>
  <span class="text-xs py-1 text-rose-700">
    {{ errorText }}
  </span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  errorText?: string;
}>();
</script>
