<template>
  <section
    class="font-main text-gray-50"
    :key="this.$store.state.groupModule.componentKeyCreateGroup"
  >
    <div class="px-6 mt-4 w-full font-main mb-4">
      <span class="pb-2 font-medium">Groupname</span>
      <input
        type="text"
        name=""
        id=""
        class="rounded w-full px-4 py-2 font-main text-gray-900 text-base outline-none focus:ring-2 ring-sky-400"
        placeholder="Enter a groupname"
        v-model="groupname"
      />
    </div>
    <div class="border-t border-gray-50">
      <UserAddGroup
        v-for="(user, index) in this.$store.state.groupModule.userListGroup"
        :key="index"
        :user="user.username"
        :email="user.email"
        :userIndex="index"
      ></UserAddGroup>
    </div>

    <div class="border-t border-gray-50 mt-6">
      <UserDelete
        v-for="(user, index) in this.$store.state.groupModule.userGroup"
        :key="index"
        :userDelete="user.username"
        :email="user.email"
        :userIndex="index"
      ></UserDelete>
    </div>
    <div class="w-full">
      <button
        class="w-full bg-gradient-to-br py-4 bg-gradient font-medium"
        @click="createGroup"
      >
        Create group
      </button>
    </div>
  </section>
</template>

<script>
import UserAddGroup from "../../components/UserAddGroup.vue";
import UserDelete from "../../components/UserDelete.vue";

export default {
  components: {
    UserAddGroup,
    UserDelete,
  },
  data() {
    return {
      groupname: "",
    };
  },
  methods: {
    createGroup() {
      this.$store.dispatch("createGroup", {
        groupname: this.groupname,
      });
      this.groupname = "";
    },
  },
};
</script>

<style></style>
