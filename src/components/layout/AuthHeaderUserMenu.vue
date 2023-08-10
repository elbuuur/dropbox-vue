<template>
  <div class="flex items-center ml-3 relative">
    <div>
      <button
        @click="toggleUserMenu"
        type="button"
        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded="false"
        data-dropdown-toggle-trigger
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="w-8 h-8 p-2 rounded-full"
          src="@/assets/user.svg"
          alt="user photo"
        />
      </button>
    </div>
    <div
      v-if="isOpenUserMenu"
      class="right-0 absolute top-6 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
      data-dropdown-toggle-menu
    >
      <div class="px-4 py-3" role="none">
        <p class="text-sm text-gray-900 dark:text-white" role="none">
          {{ userData.name }}
        </p>
        <p
          class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
          role="none"
        >
          {{ userData.email }}
        </p>
      </div>
      <ul class="py-1" role="none">
        <li>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            >Settings</a
          >
        </li>
        <li>
          <a
            @click="userStore.logoutUser()"
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            >Sign out</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref, onMounted, onBeforeUnmount } from "vue";

const userStore = useUserStore();
const isOpenUserMenu = ref(false);

if (userStore.userData.email.length < 1) {
  userStore.fetchUserData();
}

const userData = userStore.getUser;

const handleClickOutside = (event: MouseEvent) => {
  const activeTrigger = (event.target as HTMLElement).closest(
    "[data-dropdown-toggle-trigger]"
  );
  const menuPanel = (event.target as HTMLElement).closest(
    "[data-dropdown-toggle-menu]"
  );

  if (isOpenUserMenu.value && !activeTrigger && !menuPanel) {
    isOpenUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleUserMenu = () => {
  isOpenUserMenu.value = !isOpenUserMenu.value;
};
</script>
