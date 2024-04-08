<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toaster from './components/Toaster.vue';
</script>

<template>
  <main>
    <RouterView />
  </main>
  <Toaster />
</template>

<style scoped></style>
