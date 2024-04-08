<script setup lang="ts">
import facebook from "../assets/images/socials/facebook.svg";
import google from "../assets/images/socials/google.svg";
import linkedin from "../assets/images/socials/linkedin.svg";

const icons = {
  facebook,
  google,
  linkedin,
};

defineProps<{ name: keyof typeof icons }>();
</script>

<template>
  <img :src="icons[name]" :alt="name" :class="['Icon', `Icon-${name}`]" v-if="name" />
</template>

<style scoped>
.Icon {
  width: 30px;
  height: 30px;
}
</style>
