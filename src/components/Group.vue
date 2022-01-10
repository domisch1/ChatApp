<template>
  <section
    class="flex flex-row items-center px-6 py-4 bg-gradient cursor-pointer"
    :class="{ 'bg-gradient-dark': checkGroupActive }"
  >
    <div class="relative">
      <div
        class="relative flex justify-center items-center h-10 w-10 mr-4 rounded-full bg-gradient-dark"
      >
        <span class="text-xl">{{ this.groupAvatar }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-xl"> {{ this.groupname }} </span>
      <!-- <span class="text-base"> {{ this.userMessages + " new messages" }} </span> -->
    </div>
  </section>
</template>

<script>
export default {
  props: ["group", "avatar", "id"],
  data() {
    return {
      groupname: this.group,
      groupAvatar: this.avatar,
      groupID: this.id,
    };
  },
  computed: {
    checkGroupActive() {
      if (
        this.$store.state.chatModule.activeChat.groupID === this.groupID &&
        this.$store.state.chatModule.activeChat.groupID !== undefined
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
