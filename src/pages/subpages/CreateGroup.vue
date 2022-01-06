<template>
  <section class="font-main text-gray-50">
    <div class="px-6 mt-4 w-full font-main mb-4">
      <span class="pb-2 font-medium">Groupname</span>
      <input
        type="text"
        name=""
        id=""
        class="rounded w-full px-4 py-2 font-main text-gray-900 text-base outline-none focus:ring-2 ring-sky-400"
        placeholder="Enter a groupname"
      />
    </div>
    <div class="border-t border-gray-50">
      <UserAdd
        v-for="(user, index) in users"
        :key="index"
        :user="user"
      ></UserAdd>
    </div>

    <div class="border-t border-gray-50 mt-6">
      <UserDelete
        v-for="(user, index) in usersDelete"
        :key="index"
        :userDelete="user"
      ></UserDelete>
    </div>
    <div class="w-full">
      <button
        class="w-full bg-gradient-to-br py-4 from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 font-medium"
      >
        Create group
      </button>
    </div>
  </section>
</template>

<script>
import UserAdd from "../../components/UserAdd.vue";
import UserDelete from "../../components/UserDelete.vue";

export default {
  components: {
    UserAdd,
    UserDelete,
  },
  data() {
    return {
      users: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
      usersDelete: ["Monica Cola", "Jason Moon", "Mirana Trup", "Iko Aka"],
    };
  },
};
</script>

<style></style>
