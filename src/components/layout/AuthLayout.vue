<template>
  <div class="container">
    <auth-header @toggle-sidebar="handleToggle"></auth-header>
    <auth-sidebar :is-mobile-sidebar-visible="showMobileSidebar"></auth-sidebar>
    <div class="p-4 sm:ml-64">
      <div class="p-4 mt-14">
        <slot></slot>
      </div>
    </div>
  </div>
  <flash-notification-message> </flash-notification-message>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AuthHeader from "@/components/layout/AuthHeader.vue";
import AuthSidebar from "@/components/layout/AuthSidebar.vue";
import FlashNotificationMessage from "@/components/kit/notification/FlashNotificationMessage.vue";

const showMobileSidebar = ref(false);

function handleToggle(value: boolean) {
  showMobileSidebar.value = value;
}
</script>
