<script setup lang="ts">
import { timer } from '@/lib/timer';
import type { Toast } from '@/stores/toaster';
import { onMounted, ref } from 'vue';

const props = defineProps<Omit<Toast, "id" | "content">>();
const emit = defineEmits<{ remove: [] }>();

const delay = 5000 + (props?.deltaDelay || 0);
const fadeTimeOut = ref<() => void>(() => { });
const toastRef = ref<null | HTMLDivElement>(null);

onMounted(() => {
  const { set, cancel } = timer(100);
  set(setActive, "add");
  const cancelRemove = removeToast(delay);

  return () => {
    cancel();
    cancelRemove();
  };
});

const setActive = (method: "add" | "remove") => {
  toastRef.value?.classList[method]("active");
};

function removeToast(ms: number) {
  const { set, cancel } = timer(ms);
  const { set: close, cancel: cancelClose } = timer(ms + 300);

  set(setActive, "remove");
  close(emit, "remove");

  const cancelAll = () => {
    cancelClose();
    cancel();
  };

  fadeTimeOut.value = cancelAll;
  return cancelAll;
}

const onClose = () => {
  setActive("remove");
  const { set } = timer(300);
  set(() => emit("remove"));
};

const setNewTimer = () => {
  removeToast(delay);
};

</script>

<template>
  <div :class="['Toast', level]" ref="toastRef" @mouseenter="fadeTimeOut" @mouseleave="setNewTimer">
    <p class="Toast-level">{{ level }}</p>

    <button class="Toast-close" aria-label="close toaster" @click="onClose" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.Toast {
  position: relative;
  width: 350px;
  padding: 1.25rem;
  background-color: var(--black_10);
  color: var(--white);
  border-radius: 2px;
  font-size: var(--fSize16);
  font-weight: 400;
  transform: translateX(200%);
  transition:
    transform 0.3s ease,
    outline 0.1s ease;

  &:not(&:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    outline-width: 3px !important;
  }

  &.active {
    transform: translateX(0);
  }

  &.error {
    outline: 1px solid var(--red);

    .Toast-level,
    .Toast-close::before {
      color: var(--red);
    }
  }

  &.success {
    outline: 1px solid var(--blue);

    .Toast-level,
    .Toast-close::before {
      color: var(--blue);
    }
  }

  &-level {
    font-size: var(--fSize18);
    font-weight: 500;
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    line-height: 1.1;
  }

  &-close {
    padding: 0.5rem;
    position: absolute;
    top: -8px;
    right: 0;
    cursor: pointer;
    margin: 0.25rem;
    background-color: transparent;

    &::before {
      content: "\271A";
      font-size: var(--fSize28);
      transform: rotate(45deg);
      list-style: 1;
      display: inline-block;
    }
  }
}
</style>
