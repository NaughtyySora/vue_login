import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToasterStore = defineStore('toaster', () => {
  const toasts = ref(new Map());

  const addToast = () => {

  };

  return { addToast, toasts };
})
