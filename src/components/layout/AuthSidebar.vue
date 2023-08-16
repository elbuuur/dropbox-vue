<template>
  <aside
    :class="{ '-translate-x-full': isMobile && !isMobileVisible }"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <create-file-folder-button text="Create"></create-file-folder-button>
      <ul class="space-y-2 font-medium mt-8">
        <li>
          <router-link
            :to="{ name: 'trashbox' }"
            class="flex items-center py-2 text-sm text-gray-600 rounded-lg dark:text-white hover:text-gray-400 group"
            >Trashbox</router-link
          >
        </li>
        <li>Usage memory (separate component)</li>
        <li>
          <a
            @click="userStore.logoutUser()"
            href="#"
            class="flex items-center py-2 text-sm text-gray-600 rounded-lg dark:text-white hover:text-gray-400 group"
            >Sign Out
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import CreateFileFolderButton from "@/components/CreatePopupTriggerButton.vue";
import { useUserStore } from "@/stores/user";

const props = defineProps<{
  isMobileSidebarVisible?: boolean;
}>();

const userStore = useUserStore();
const isMobile = computed(() => {
  return window.innerWidth <= 640;
});

const isMobileVisible = computed(() => {
  return props.isMobileSidebarVisible;
});
</script>
