<template>
  <section>
    <!-- <div
      class="h-screen w-screen flex justify-center items-center"
      v-if="this.getWidth <= 640"
    >
      <h1 class="font-main text-3xl">Mobile coming soon</h1>
    </div> -->
    <router-view class=""></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    getWidth() {
      return this.screenWidth;
    },
  },
  created() {
    this.$store.dispatch("watchAuth");
    // this.$store.dispatch("test");
  },
  mounted() {
    window.addEventListener("resize", this.changeWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeWidth);
  },
  methods: {
    changeWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style></style>
