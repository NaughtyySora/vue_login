<script setup lang="ts">
import { authApi } from '@/api/auth/api';
import { bulkValidateForm } from '@/lib/validators';
import { useToasterStore } from '@/stores/toaster';

const { successToast, errorToast } = useToasterStore();

const onSubmit = (e: Event & { currentTarget: HTMLFormElement }) => {
  const data = new FormData(e.currentTarget);
  const isValid = bulkValidateForm({ data, options: [{ key: "email" }, { key: "password" }] });

  if (!isValid) {
    errorToast({ content: "Fields are not valid" });
    return;
  }

  authApi
    .singIn(data)
    .then(() => void successToast({ content: "Sign In Success!" }))
    .catch(() => void errorToast({ content: "Sign in Error" }));
};
</script>

<template>
  <Form :$attrs title="Sign in" buttonTitle="Sign In" class="SignIn" @submit.prevent="onSubmit">
    <p class="SignIn-text">or use your account</p>
    <input class="SignIn-email" type="email" placeholder="Email" name="email" />
    <input class="SignIn-password" type="password" placeholder="Password" name="password" />
    <a href="/forgot-password" class="SignIn-forgot">Forgot your password?</a>
  </Form>
</template>

<style scoped lang="scss">
.SignIn {
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
