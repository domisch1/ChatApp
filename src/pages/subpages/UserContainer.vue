<template>
  <section class="flex flex-col w-full">
    <User
      v-for="(user, index) in this.$store.state.addedUsers"
      :key="index"
      :userName="user.username"
      :avatar="user.avatar"
    ></User>
  </section>
</template>

<script>
import User from "../../components/User.vue";

export default {
  components: {
    User,
  },
};
</script>

<style></style>
