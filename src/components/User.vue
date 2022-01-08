<template>
  <section
    class="flex flex-row items-center px-6 py-4 bg-gradient cursor-pointer"
  >
    <div class="relative">
      <div
        class="relative flex justify-center items-center h-10 w-10 mr-4 rounded-full bg-gradient-dark"
      >
        <span class="text-xl">{{ this.userAvatar }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-xl"> {{ this.user }} </span>
      <!-- <span class="text-base"> {{ this.userMessages + " new messages" }} </span> -->
    </div>
  </section>
</template>

<script>
export default {
  props: ["userName", "avatar", "newMessages"],
  data() {
    return {
      user: this.userName,
      userAvatar: this.avatar,
    };
  },
};
</script>

<style></style>
