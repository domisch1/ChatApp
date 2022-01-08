<template>
  <section class="flex flex-col w-full">
    <User
      v-for="(user, index) in this.$store.state.userHandlingModule.addedUsers"
      :key="index"
      :userName="user.username"
      :avatar="user.avatar"
      @click="openChat(user.email, user.username, user.partner1, user.partner2)"
    ></User>
  </section>
</template>

<script>
import User from "../../components/User.vue";

export default {
  components: {
    User,
  },
  methods: {
    openChat(email, username, partner1, partner2) {
      this.$store.dispatch("openChat", {
        email: email,
        username: username,
        partner1: partner1,
        partner2: partner2,
      });
    },
  },
};
</script>

<style></style>
