<template>
  <section class="flex flex-row items-center px-6 py-4 bg-gradient">
    <div class="relative">
      <div
        class="relative flex justify-center items-center h-10 w-10 mr-4 rounded-full bg-gradient-dark"
      >
        <span class="text-xl">{{ this.userAvatar }}</span>
        <div
          class="absolute top-0.5 right-1 block w-1.5 h-1.5 rounded-full bg-red-600"
          :class="{ 'bg-green-600': this.userOnline }"
        ></div>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-xl"> {{ this.user }} </span>
      <span class="text-base"> {{ this.userMessages + " new messages" }} </span>
    </div>
  </section>
</template>

<script>
export default {
  props: ["userName", "avatar", "newMessages", "online"],
  data() {
    return {
      user: this.userName,
      userAvatar: this.avatar,
      userMessages: this.newMessages,
      userOnline: this.online,
    };
  },
};
</script>

<style></style>
