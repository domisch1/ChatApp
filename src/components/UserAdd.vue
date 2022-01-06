<template>
  <section class="user-action-container">
    <img src="../assets/Icons/UserBlack.svg" alt="User" class="w-6 h-6 mr-2" />
    <span class="text-base text-gray-50"> {{ userName }} </span>
    <button class="absolute right-6 p-2 rounded bg-gradient">
      <img src="../assets/Icons/Shape.svg" alt="Add" class="h-4 w-4" />
    </button>
  </section>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      userName: this.user,
    };
  },
};
</script>

<style></style>
