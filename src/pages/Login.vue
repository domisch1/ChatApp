<script>
import ButtonRound from "../components/ButtonRound.vue";
import InputRound from "../components/InputRound.vue";

export default {
  components: {
    ButtonRound,
    InputRound,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>

<template>
  <section
    class="
      flex flex-col
      justify-center
      items-center
      w-screen
      h-screen
      font-main
    "
  >
    <form class="flex flex-col items-center w-full sm:w-96 px-6 sm:px-0">
      <h1 class="text-2xl mb-6">Login</h1>
      <InputRound
        class="w-full"
        placeholder="test@test.com"
        v-model="user.email"
      ></InputRound>
      <InputRound
        class="w-full my-6"
        placeholder="Password"
        v-model="user.password"
        type="password"
      ></InputRound>
      <ButtonRound class="mb-4 w-full" :content="'Login'"></ButtonRound>
      <p class="text-sm">
        Don't have an account?
        <router-link to="/signup" class="text-purple-600 font-medium"
          >Sign up</router-link
        >
      </p>
    </form>
  </section>
</template>

<style></style>
