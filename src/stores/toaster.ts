import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export interface Toast {
  level: Level;
  content: any;
  id: string;
  deltaDelay?: number;
}

type AddOptions = Omit<Toast, "level" | "id">;
type Level = "success" | "error";

export const useToasterStore = defineStore('toaster', () => {
  const toasts: Ref<Toast[]> = ref([]);

  const addToast = (level: Level, options: AddOptions) => {
    const { content, deltaDelay = 0 } = options;
    const   id = String(Date.now() / Math.random());
    const toast = { content, deltaDelay, level, id };
    toasts.value = [...toasts.value, toast];
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }

  const successToast = addToast.bind(null, "success");
  const errorToast = addToast.bind(null, "error");

  return { toasts, addToast, errorToast, successToast, removeToast };
});
