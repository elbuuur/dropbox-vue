<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-6 text-gray-900"
      >{{ title }}
    </label>
    <div class="mt-2">
      <input
        :value="modelValue"
        :type="type"
        :name="name"
        :autocomplete="type"
        @keydown.enter="updateModelValue"
        @input="updateModelValue"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <error-text v-if="error" :error-text="error"></error-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ErrorText from "@/components/kit/text/ErrorText.vue";

const props = defineProps<{
  title?: string;
  name?: string;
  type?: string;
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "resetValidation", value: string): void;
}>();

function updateModelValue(e: InputEvent) {
  let target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);

  if (target.value !== props.modelValue) {
    emit("resetValidation", "");
  }
}
</script>
