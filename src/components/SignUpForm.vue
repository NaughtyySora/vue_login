<script setup lang="ts">
import { authApi } from '@/api/auth/api';
import { bulkValidateForm } from '@/lib/validators';
import { useToasterStore } from '@/stores/toaster';

const options = [{ key: "email" }, { key: "password" }, { key: "name" }];
const { successToast, errorToast } = useToasterStore();

const onSubmit = (e: Event & { currentTarget: HTMLFormElement }) => {
  const data = new FormData(e.currentTarget);
  const isValid = bulkValidateForm({ data, options });

  if (!isValid) {
    errorToast({ content: "Fields are not valid" });
    return;
  }

  authApi
    .singUp(data)
    .then(() => void successToast({ content: "Sing Up Success!" }))
    .catch(() => void errorToast({ content: "Sing Up Error" }));
};
</script>

<template>
  <Form :$attrs title="Create Account" buttonTitle="Sign Up" class="SignUp" @submit.prevent="onSubmit">
    <p class="SignUp-text">or use your email for registration</p>
    <input type="text" placeholder="Name" class="SignUp-name" name="name" />
    <input type="email" placeholder="Email" class="SignUp-email" name="email" />
    <input type="password" placeholder="Password" class="SignUp-password" name="password" />
  </Form>
</template>

<style scoped lang="scss">
.SignUp {
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
