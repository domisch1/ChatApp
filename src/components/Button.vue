<script>
export default {
  props: ["content"],
  data() {
    return {
      buttonText: this.content,
    };
  },
};
</script>

<template>
  <button
    class="
      block
      py-3.5
      text-base
      font-medium font-main
      rounded-sm
      text-gray-50
      bg-purple-700
      hover:bg-purple-800
    "
  >
    {{ buttonText }}
  </button>
</template>

<style></style>
