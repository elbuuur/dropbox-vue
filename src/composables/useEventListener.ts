import { onMounted, onUnmounted } from "vue";

export function useEventListener<T extends Event>(
  target: EventTarget,
  event: string,
  callback: (event: T) => void
): void {
  const eventListener: EventListener = (evt) => {
    callback(evt as T);
  };

  onMounted(() => target.addEventListener(event, eventListener));
  onUnmounted(() => target.removeEventListener(event, eventListener));
}
