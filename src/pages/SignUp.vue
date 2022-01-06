<template>
  <section class="container-form">
    <form class="form-auth">
      <h1 class="text-2xl mb-6">Sign up</h1>
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
        placeholder="Username"
        v-model="user.username"
        @blur="checkUsername"
      />
      <span class="warning-text mt-1" v-show="confirmation.username"
        >Please enter a valid username</span
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
      <input
        class="input-round mt-6"
        placeholder="Password"
        v-model="user.confirmPassword"
        type="password"
        @blur="checkConfirmPassword"
      />
      <span class="warning-text mt-1" v-show="confirmation.confirmPassword"
        >Wrong password</span
      >
      <button class="btn-round" @click.prevent="signUp">Sign up</button>
      <p class="text-sm">
        Already have an account?
        <router-link to="/login" class="link-auth">Login</router-link>
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
        username: "",
        password: "",
        confirmPassword: "",
      },
      confirmation: {
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  methods: {
    signUp() {
      if (
        !this.confirmation.email &&
        !this.confirmation.username &&
        !this.confirmation.password &&
        !this.confirmation.confirmPassword &&
        this.user.email !== "" &&
        this.user.username !== "" &&
        this.user.password !== "" &&
        this.user.confirmPassword !== ""
      ) {
        this.$store.dispatch("signUp", {
          email: this.user.email,
          password: this.user.password,
          username: this.user.username,
        });
        this.user = {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
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
    checkUsername() {
      if (this.user.username.length >= 3) {
        this.confirmation.username = false;
      } else {
        this.confirmation.username = true;
      }
    },
    checkPassword() {
      if (this.user.password.length >= 6) {
        this.confirmation.password = false;
      } else {
        this.confirmation.password = true;
      }
    },
    checkConfirmPassword() {
      if (
        this.user.confirmPassword.length >= 6 &&
        this.user.password === this.user.confirmPassword
      ) {
        this.confirmation.confirmPassword = false;
      } else {
        this.confirmation.confirmPassword = true;
      }
    },
  },
};
</script>

<style></style>
