<template>
  <section class="relative">
    <UserAdd v-for="(user, index) in users" :key="index" :user="user"></UserAdd>
  </section>
</template>

<script>
import UserAdd from "../../components/UserAdd.vue";
export default {
  components: {
    UserAdd,
  },
  data() {
    return {
      users: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
    };
  },
};
</script>

<style></style>
