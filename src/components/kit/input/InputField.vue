<template>
  <div>
    <label
      :for="name"
      class="block text-xs font-medium leading-6 text-gray-900"
      :class="{ 'opacity-50': disabled }"
      >{{ title }}
    </label>
    <div class="mt-2">
      <input
        :disabled="disabled"
        :value="modelValue"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        @keydown.enter="updateModelValue"
        @input="updateModelValue"
        class="disabled:opacity-50 bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-approx-teal focus:ring-approx-teal-600 sm:text-sm sm:leading-6"
      />

      <notification-message v-if="error" notification-type="error">
        {{ error }}
      </notification-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";

const props = defineProps<{
  title?: string;
  name?: string;
  type?: string;
  autocomplete?: string;
  modelValue: string | number;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
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
