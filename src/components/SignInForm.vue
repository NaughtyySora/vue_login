<script setup lang="ts">
import { authApi } from '@/api/auth/api';
import { bulkValidateForm } from '@/lib/validators';
import { useToasterStore } from '@/stores/toaster';
import Form from './Form.vue';

const store = useToasterStore();

const onSubmit = (e: Event) => {
  const data = new FormData(e.target as HTMLFormElement);
  const isValid = bulkValidateForm({ data, options: [{ key: "email" }, { key: "password" }] });

  if (!isValid) {
    store.errorToast({ content: "Fields are not valid" });
    return;
  }

  store.successToast({ content: "Sign In Success!" });

  // authApi
  //   .singIn(data)
  //   .then(() => void store.successToast({ content: "Sign In Success!" }))
  //   .catch(() => void store.errorToast({ content: "Sign in Error" }));
};
</script>

<template>
  <Form title="Sign in" buttonTitle="Sign In" class="SignIn" @submit.prevent="onSubmit">
    <p class="SignIn-text">or use your account</p>
    <input class="SignIn-email" type="email" placeholder="Email" name="email" />
    <input class="SignIn-password" type="password" placeholder="Password" name="password" />
    <a href="/forgot-password" class="SignIn-forgot">Forgot your password?</a>
  </Form>
</template>

<style lang="scss">
.SignIn {
  transform: translate(100%);
  transition: transform .65s;

  &.right {
    transform: translate(0);
  }

  &-text {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: var(--fSize14);
  }

  &-email,
  &-password {
    background-color: var(--white_20);
    border: none;
    padding: 0.825rem 1rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  &-password {
    margin-bottom: 1.5rem;
  }

  &-forgot {
    display: block;
    text-align: center;
    cursor: pointer;
  }
}
</style>
