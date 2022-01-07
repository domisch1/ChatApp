<template>
  <section class="container-form">
    <form class="form-auth">
      <h1 class="text-2xl mb-6">Login</h1>
      <input
        class="input-round"
        placeholder="test@test.com"
        v-model="user.email"
        @blur="checkEmail"
      />
      <span class="warning-text mt-1" v-show="confirmation.email"
        >Please enter a correct e-mail</span
      >
      <input
        class="input-round mt-6"
        placeholder="Password"
        v-model="user.password"
        type="password"
        @blur="checkPassword"
      />
      <span class="warning-text mt-1" v-show="confirmation.password"
        >Password needs at least 6 characters</span
      >
      <button class="btn-round" @click.prevent="login">Login</button>
      <p class="text-sm">
        Don't have an account?
        <router-link to="/signup" class="link-auth">Sign up</router-link>
      </p>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      confirmation: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    login() {
      if (
        !this.confirmation.email &&
        !this.confirmation.password &&
        this.user.email !== "" &&
        this.user.password !== ""
      ) {
        this.$store.dispatch("login", {
          email: this.user.email,
          password: this.user.password,
        });
        this.user = {
          email: "",
          password: "",
        };
      }
    },
    checkEmail() {
      const regex = /@/gi;
      if (this.user.email.match(regex) !== null) {
        this.confirmation.email = false;
      } else {
        this.confirmation.email = true;
      }
    },
    checkPassword() {
      if (this.user.password.length >= 6) {
        this.confirmation.password = false;
      } else {
        this.confirmation.password = true;
      }
    },
  },
};
</script>

<style></style>
