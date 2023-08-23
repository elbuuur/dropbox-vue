import { useEventListener } from "@/composables/useEventListener";
export default function useDialogClickOutside(
  dialogBodySelector: string,
  emit: (event: "closeDialog", value: boolean) => void
) {
  const handleDialogClickOutside = (event: MouseEvent) => {
    const activeTrigger = (event.target as HTMLElement).closest(
      dialogBodySelector
    );

    if (!activeTrigger && document.querySelector(dialogBodySelector)) {
      console.log(
        document.querySelector(dialogBodySelector),
        "dialogBodySelector"
      );
      console.log(activeTrigger, "activeTrigger");
      console.log("emit");
      emit("closeDialog", true);
    }
  };

  useEventListener(window, "click", handleDialogClickOutside);
}
