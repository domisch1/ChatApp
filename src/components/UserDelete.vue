<template>
  <section class="user-action-container">
    <img src="../assets/Icons/UserBlack.svg" alt="User" class="w-6 h-6 mr-2" />
    <div class="flex flex-col">
      <span class="text-base"> {{ userName }} </span>
      <span class="text-xs"> {{ userEmail }} </span>
    </div>
    <button class="absolute right-6 p-2 rounded bg-gradient">
      <img src="../assets/Icons/Minus.svg" alt="Add" class="h-4 w-4" />
    </button>
  </section>
</template>

<script>
export default {
  props: ["userDelete", "email"],
  data() {
    return {
      userName: this.userDelete,
      userEmail: this.email,
    };
  },
};
</script>

<style></style>
