<template>
  <section class="relative" :key="this.$store.state.componentKeyAddUser">
    <UserAdd
      v-for="(user, index) in this.$store.getters.filteredUsers"
      :key="index"
      :user="user.username"
      :email="user.email"
    ></UserAdd>
  </section>
</template>

<script>
import UserAdd from "../../components/UserAdd.vue";
export default {
  components: {
    UserAdd,
  },
};
</script>

<style></style>
