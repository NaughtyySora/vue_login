<script setup lang="ts">
import { authApi } from '@/api/auth/api';
import { bulkValidateForm } from '@/lib/validators';
import { useToasterStore } from '@/stores/toaster';
import Form from './Form.vue';

const options = [{ key: "email" }, { key: "password" }, { key: "name" }];
const store = useToasterStore();

const onSubmit = (e: Event & { currentTarget: HTMLFormElement }) => {
  const data = new FormData(e.currentTarget);
  const isValid = bulkValidateForm({ data, options });

  if (!isValid) {
    store.errorToast({ content: "Fields are not valid" });
    return;
  }
  store.successToast({ content: "Sing Up Success!" })
  // authApi
  //   .singUp(data)
  //   .then(() => void store.successToast({ content: "Sing Up Success!" }))
  //   .catch(() => void store.errorToast({ content: "Sing Up Error" }));
};
</script>

<template>
  <Form title="Create Account" buttonTitle="Sign Up" class="SignUp" @submit.prevent="onSubmit">
    <p class="SignUp-text">or use your email for registration</p>
    <input type="text" placeholder="Name" class="SignUp-name" name="name" />
    <input type="email" placeholder="Email" class="SignUp-email" name="email" />
    <input type="password" placeholder="Password" class="SignUp-password" name="password" />
  </Form>
</template>

<style lang="scss">
.SignUp {
  transform: translate(-100%);
  transition: transform .65s;

  &.left {
    transform: translate(0);
  }

  &-text {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: var(--fSize14);
  }

  &-name,
  &-email,
  &-password {
    background-color: var(--white_20);
    border: none;
    padding: 0.825rem 1rem;
    margin: 0.5rem 0;
    width: 100%;
  }
}
</style>
