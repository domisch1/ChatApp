<script setup>
import { ref } from "vue";

const toggle = ref(false);
</script>

<template>
  <section class="header text-gray-50 primary-600">
    <span class="text-xl font-display">ChatzApp</span>
    <div class="hamburger-container" @click="toggle = !toggle">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </div>
    <img
      src="../assets/Icons/Close.svg"
      alt="Close"
      class="close-hidden"
      :class="{ 'close-show': toggle }"
    />
    <div
      class="container-blur-hide"
      :class="{ 'container-blur': toggle }"
    ></div>
    <nav class="header-nav" :class="{ 'sideline-nav': toggle }">
      <div class="item-container">
        <img src="../assets/Icons/User.svg" alt="User" class="nav-icon" />
        <router-link to="/home/profile" class="nav-item">Profile</router-link>
      </div>
    </nav>
  </section>
</template>
<style>
.header {
  @apply flex flex-row items-center px-6 w-screen  font-main overflow-hidden;
}
.header-nav {
  @apply absolute right-0 hidden sm:block sm:transform sm:translate-x-0 transform translate-x-full transition-all duration-150;
}
.sideline-nav {
  @apply absolute top-0 flex flex-col justify-center pl-6 w-64 h-screen bg-purple-600 transform -translate-x-full;
}
.container-blur {
  @apply absolute top-0 left-0 block w-screen h-screen bg-purple-900 transform -translate-x-full;
}
.container-blur-hide {
  @apply transform translate-x-full transition-all duration-150;
}
.item-container {
  @apply flex flex-row items-center;
}
.nav-icon {
  @apply pr-2;
}
.nav-item {
  @apply font-medium mr-6;
}
.hamburger-container {
  @apply absolute right-6 flex flex-col justify-between items-end w-8 h-4 sm:hidden cursor-pointer z-10;
}
.hamburger-line {
  @apply block h-0.5 w-full bg-gray-50 rounded;
}
.hamburger-line:last-child {
  @apply w-6;
}
.close-hidden {
  @apply absolute right-6 h-8 w-8 opacity-0 z-0 transition-all delay-150 duration-150;
}
.close-show {
  @apply opacity-100 z-50;
}
</style>
