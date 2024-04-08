import { computed, ref, type Ref } from 'vue';
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
  const store: Ref<Map<string, any>> = ref(new Map());
  const toasts = computed(() => Array.from(store.value));

  const addToast = (level: Level, options: AddOptions) => {
    const { content, deltaDelay = 0 } = options;
    const id = String(Date.now() / Math.random());
    const toast = { content, deltaDelay, level, id };
    store.value.set(id, toast);
  };

  const removeToast = (id: string) => store.value.delete(id)

  const successToast = addToast.bind(null, "success");
  const errorToast = addToast.bind(null, "error");

  return { toasts, addToast, errorToast, successToast, removeToast };
});
