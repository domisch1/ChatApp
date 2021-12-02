<script>
export default {
  props: ["userDelete"],
  data() {
    return {
      userName: this.userDelete,
    };
  },
};
</script>

<template>
  <section
    class="
      relative
      flex flex-row
      items-center
      w-full
      px-6
      py-4
      border-b border-purple-600
      font-main
    "
  >
    <img src="../assets/Icons/UserBlack.svg" alt="User" class="w-6 h-6 mr-2" />
    <span class="text-base text-gray-900"> {{ userName }} </span>
    <button
      class="
        absolute
        right-6
        bg-red-700
        p-2
        rounded
        hover:bg-red-800
        transition-all
        duration-100
      "
    >
      <img src="../assets/Icons/Minus.svg" alt="Add" class="h-4 w-4" />
    </button>
  </section>
</template>

<style></style>
