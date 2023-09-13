import { defineStore } from "pinia";

interface Notification {
  type: "success" | "error" | "warning";
  text: string;
  time: number;
}
interface NotificationState {
  notifications: Notification[];
}

export const useFlashNotificationStore = defineStore("notification", {
  state: (): NotificationState => ({
    notifications: [],
  }),
  getters: {
    getNotifications(state): Notification[] {
      return state.notifications;
    },
  },
  actions: {
    addNotification(newNotification: Notification): void {
      this.notifications.push(newNotification);

      setTimeout(() => {
        this.notifications = this.notifications.filter(
          (notification) => notification.text !== newNotification.text
        );
      }, newNotification.time);
    },
  },
});
