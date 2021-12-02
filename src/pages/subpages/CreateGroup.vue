<script>
import UserAddContainer from "../../components/UserAddContainer.vue";
import UserDelete from "../../components/UserDelete.vue";
import InputRound from "../../components/InputRound.vue";
import Button from "../../components/Button.vue";

export default {
  components: {
    UserAddContainer,
    UserDelete,
    InputRound,
    Button,
  },
  data() {
    return {
      users: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
      usersDelete: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
    };
  },
};
</script>

<template>
  <section>
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
        to="/home"
        class="hover:text-gray-800 transition-all duration-150"
        >Chats</router-link
      >
    </section>
    <div class="px-6 w-full">
      <InputRound
        class="w-full my-2 box-border"
        placeholder="Groupname"
      ></InputRound>
    </div>
    <h3 class="text-base font-main font-medium mx-6 my-3">Add Friends</h3>
    <UserAddContainer
      v-for="(user, index) in users"
      :key="index"
      :user="user"
    ></UserAddContainer>
    <h3 class="text-base font-main font-medium mx-6 mb-4 mt-6">
      Group members
    </h3>
    <UserDelete
      v-for="(user, index) in usersDelete"
      :key="index"
      :userDelete="user"
    ></UserDelete>
    <div class="px-6 w-full">
      <Button :content="'Create group'" class="my-4 w-full"></Button>
    </div>
  </section>
</template>

<style></style>
