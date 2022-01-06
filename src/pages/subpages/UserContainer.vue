<template>
  <section class="flex flex-col w-full">
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

<style></style>
