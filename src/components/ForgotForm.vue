<script setup lang="ts">
import { ref } from "vue";
import { validators } from "@/lib/validators";
import { useToasterStore } from "@/stores/toaster";
import { authApi } from "@/api/auth/api";

const sended = ref(false);
const store = useToasterStore();

const onSubmit = (e: Event) => {
  const data = new FormData(e.target as HTMLFormElement);

  if (!validators.email(data.get("email") as string)) {
    store.errorToast({ content: "Invalid Email" });
    return;
  }
  store.successToast({ content: "Request sent !" });
  sended.value = true;
  
  // authApi.forgot(data)
  //   .then(() => {
  //     store.successToast({ content: "Request sent !" })
  //     sended.value = true;
  //   })
  //   .catch(() => void store.errorToast({ content: "Error while send request" }));
};

</script>
<template>
  <div class="ForgotForm">
    <template v-if="!sended">
      <h1 class="ForgotForm-title">Enter Your Email</h1>
      <form class="ForgotForm-form" @submit.prevent="onSubmit">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          id="email" 
          class="ForgotForm-email" 
          autocomplete="email"
        />

        <button class="ForgotForm-submit">Submit</button>
      </form>
    </template>

    <div v-else>
      <h1 class="ForgotForm-title">Check your email</h1>
      <span class="ForgotForm-letter" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.ForgotForm {
  border-radius: 1rem;
  background-color: var(--white);
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  min-width: 450px;
  padding: 2.5rem;
  min-height: 300px;

  &-title {
    flex-basis: 100%;
    margin-bottom: 2.5rem;
    font-size: var(--fSize32);
    font-weight: 400;
    text-align: center;
  }

  &-email {
    background-color: var(--white_20);
    border: none;
    padding: 0.825rem 1rem;
    margin: 0.5rem 0;
    width: 100%;
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

  &-letter {
    &::before {
      content: "\2709";
      font-size: var(--fSize64);
      line-height: 1;
      color: var(--blue);
      text-align: center;
      display: block;
    }
  }
}
</style>
