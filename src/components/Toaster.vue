<script setup lang="ts">
import Toast from "@/components/Toast.vue";
import { useToasterStore } from "@/stores/toaster";
const { toasts, removeToast } = useToasterStore();
</script>

<template>
  <section class="Toaster">
    <Toast 
      v-for="[key, { content, id, level, deltaDelay = 300 }], idx of toasts" 
      :deltaDelay="idx * deltaDelay"
      :onRemove="removeToast(id)"
      :level="level"
      :key="key"
    >
      {{ content }}
    </Toast>

  </section>
</template>

<style scoped>
.Toaster {
  z-index: 99;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: fit-content;
  height: fit-content;
  padding: 1rem 1.5rem;
}
</style>
