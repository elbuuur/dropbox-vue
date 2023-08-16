import { onMounted, onUnmounted } from "vue";
export default function useDialogClickOutside(
  dialogBodySelector: string,
  emit: (event: "closeDialog", value: boolean) => void
) {
  const handleDialogClickOutside = (event: MouseEvent) => {
    const activeTrigger = (event.target as HTMLElement).closest(
      dialogBodySelector
    );

    if (!activeTrigger) {
      emit("closeDialog", true);
    }
  };

  onMounted(() => {
    window.addEventListener("click", handleDialogClickOutside);
  });

  onUnmounted(() => {
    window.removeEventListener("click", handleDialogClickOutside);
  });
}
