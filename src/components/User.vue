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

<template>
  <section class="user-container">
    <div class="relative">
      <div class="avatar-container">
        <span class="text-xl text-gray-50">{{ this.userAvatar }}</span>
        <div
          class="avatar-status"
          :class="{ 'avatar-online': this.userOnline }"
        ></div>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-xl"> {{ this.user }} </span>
      <span class="text-base"> {{ this.userMessages + " new messages" }} </span>
    </div>
  </section>
</template>

<style>
.user-container {
  @apply flex flex-row items-center px-6 py-4 bg-purple-50 font-main border-b border-purple-600 cursor-pointer hover:bg-purple-200 transition-all duration-100;
}
.avatar-container {
  @apply relative flex justify-center items-center h-10 w-10 mr-4 rounded-full bg-purple-900;
}
.avatar-status {
  @apply absolute top-0.5 right-1 block w-1.5 h-1.5 rounded-full bg-red-600;
}
.avatar-online {
  @apply bg-green-600;
}
</style>
