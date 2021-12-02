<script>
import User from "../../components/User.vue";

export default {
  components: {
    User,
  },
  data() {
    return {
      users: [
        {
          userName: "Matt Cooper",
          avatar: "M",
          newMessages: "3",
          online: true,
        },
        {
          userName: "Amanda Star",
          avatar: "A",
          newMessages: "2",
          online: false,
        },
        {
          userName: "John Wick",
          avatar: "J",
          newMessages: "0",
          online: true,
        },
      ],
    };
  },
};
</script>

<template>
  <section class="flex flex-col w-full">
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
        to="/home/add-user"
        class="hover:text-gray-800 transition-all duration-150"
        >Add user</router-link
      >
      <router-link
        to="/home/create-group"
        class="hover:text-gray-800 transition-all duration-150"
        >Create group</router-link
      >
    </section>
    <User
      v-for="(user, index) in users"
      :key="index"
      :userName="user.userName"
      :avatar="user.avatar"
      :newMessages="user.newMessages"
      :online="user.online"
    ></User>
  </section>
</template>

<style></style>
