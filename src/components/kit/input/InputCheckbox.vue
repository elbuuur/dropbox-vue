<template>
  <div class="flex items-center cursor-pointer">
    <input
      :id="checkboxName"
      type="checkbox"
      v-model="checked"
      class="w-4 h-4 text-approx-teal bg-gray-100 border-gray-300 rounded focus:ring-approx-teal focus:ring-2"
    />
    <label
      :for="checkboxName"
      class="w-full py-3 ml-2 text-sm font-normal text-gray-900"
      >{{ labelText }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from "vue";

const props = defineProps<{
  labelText: string;
  modelValue: boolean;
  checkboxName: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const checked = ref(props.modelValue);

watch(checked, (newValue) => {
  return emit("update:modelValue", newValue);
});
</script>
