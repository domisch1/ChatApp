<script>
import UserAddContainer from "../../components/UserAddContainer.vue";
import InputRound from "../../components/InputRound.vue";
export default {
  components: {
    UserAddContainer,
    InputRound,
  },
  data() {
    return {
      users: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
    };
  },
};
</script>

<template>
  <section class="relative mx-0">
    <section
      class="
        flex flex-row
        w-full
        justify-between
        px-6
        py-2
        font-main
        text-gray-600
        font-medium
        bg-pruple-50
        border-b border-purple-600
      "
    >
      <router-link
        to="/home"
        class="hover:text-gray-800 transition-all duration-150"
        >Chats</router-link
      >
      <router-link
        to="/home/create-group"
        class="hover:text-gray-800 transition-all duration-150"
        >Create group</router-link
      >
    </section>
    <div class="px-6 w-full">
      <InputRound
        class="w-full my-2 box-border"
        placeholder="Search a friend"
      ></InputRound>
    </div>
    <UserAddContainer
      v-for="(user, index) in users"
      :key="index"
      :user="user"
    ></UserAddContainer>
  </section>
</template>

<style></style>
