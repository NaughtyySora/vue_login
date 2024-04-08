<script setup lang="ts">
import Icon from "./Icon.vue";
defineProps<{ title: string, buttonTitle: string }>();

</script>

<template>
  <div class="Form-container">
    <form class="Form" :$attrs>
      <h2 class="Form-title" v-if="title">{{ title }}</h2>

      <div class="Form-socials">
        <a href="/" class="Form-socials-item">
          <Icon name="facebook" />
        </a>
        <a href="/" class="Form-socials-item">
          <Icon name="google" />
        </a>
        <a href="/" class="Form-socials-item">
          <Icon name="linkedin" />
        </a>
      </div>

      <slot />

      <button class="Form-submit" type="submit">
        {{ buttonTitle }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.Form {
  width: 100%;
  height: 100%;
  padding: 2rem;

  &.SignUp.left,
  &.SignIn.right {
    transform: translate(0);
  }

  &.SignUp {
    transform: translate(-100%);
    transition: transform .65s;
  }

  &.Form.SignIn {
    transform: translate(100%);
    transition: transform .65s;
  }

  &-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 50%;
  }

  &-title {
    font-size: var(--fSize32);
    color: var(--black);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &-socials {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto 1.5rem auto;
    max-width: fit-content;

    &-item {
      border: 1px solid var(--white_30);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.35rem;
    }
  }

  &-submit {
    background-color: var(--red);
    padding: 0.825rem 1.25rem;
    font-size: var(--fSize14);
    color: var(--white);
    border-radius: 2rem;
    min-width: 150px;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    margin: 1.5rem auto 0 auto;
  }
}
</style>
