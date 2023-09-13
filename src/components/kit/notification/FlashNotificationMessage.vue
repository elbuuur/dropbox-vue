<template>
  <Teleport to="body">
    <notification-message
      v-for="notification in notifications"
      :key="notification.text"
      :notification-type="notification.type"
      class="absolute max-w-fit z-50 top-16 right-4"
    >
      {{ notification.text }}
    </notification-message>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

import NotificationMessage from "@/components/kit/notification/NotificationMessage.vue";
import { useFlashNotificationStore } from "@/stores/flashNotifications";

const notificationStore = useFlashNotificationStore();

const notifications = computed(() => {
  return notificationStore.getNotifications;
});
</script>
