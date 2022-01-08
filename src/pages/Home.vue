<template>
  <section
    class="grid grid-cols-12 grid-rows-8 h-screen w-screen font-main text-gray-50"
  >
    <!-- ***** SIDEBAR NAV ***** -->
    <div
      class="flex pt-40 items-center flex-col col-span-1 row-span-full bg-dark-1"
    >
      <router-link to="/home" class="sidebar-link">
        <img src="../assets/Icons/ChattingIcon.svg" alt="Chat" />
      </router-link>
      <router-link to="/home/add-user" class="sidebar-link my-8">
        <img src="../assets/Icons/AddUser.svg" alt="Add friends" />
      </router-link>
      <router-link to="/home/create-group" class="sidebar-link">
        <img src="../assets/Icons/Share.svg" alt="Send" />
      </router-link>
    </div>
    <!-- ***** SIDEBAR ***** -->
    <div
      class="grid grid-rows-8 grid-cols-1 col-span-3 row-span-full bg-dark-2"
    >
      <div
        class="col-span-1 row-span-1 p-4 flex items-center bg-dark-2 border-b border-gray-50"
      >
        <span class="text-xl font-display">Chatapp</span>
      </div>
      <div class="col-span-1 row-span-6 overflow-y-scroll">
        <router-view></router-view>
      </div>
      <div
        class="relative flex items-center p-4 col-span-1 row-span-1 border-t border-gray-50"
      >
        <div class="flex flex-col">
          <p class="text-lg">{{ this.$store.state.username }}</p>
          <p class="text-xs">{{ this.$store.state.email }}</p>
        </div>
        <button
          class="absolute right-4"
          @click.prevent="this.$store.dispatch('logout')"
        >
          <img
            src="../assets/Icons/Upload.svg"
            alt="Logout"
            class="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
    <!-- ***** CHAT WINDOW ***** -->
    <div class="grid grid-rows-8 grid-cols-1 col-span-8 row-span-full">
      <div class="col-span-1 row-span-1 p-8 flex items-center bg-dark-1">
        <div class="flex flex-col">
          <span class="text-xl">
            {{ this.$store.state.activeChat.username }}
          </span>
          <span class="text-lg text-gray-300">online</span>
        </div>
        <div class="absolute right-8 flex flex-col cursor-pointer">
          <span class="user-menu-dot"></span>
          <span class="user-menu-dot my-1"></span>
          <span class="user-menu-dot"></span>
        </div>
      </div>
      <div class="col-span-1 row-span-6 p-4 overflow-y-scroll bg-light-1">
        <Message
          v-for="(message, index) in this.$store.getters.filteredMessages"
          :key="index"
          :messageClass="message.sender"
          :message="message.message"
          :time="message.time"
          :date="message.date"
        ></Message>
      </div>
      <div
        class="flex justify-center items-center p-8 col-span-1 row-span-1 bg-dark-1"
      >
        <input
          type="text"
          class="rounded-full w-full text-lg h-12 font-main text-gray-900 pl-4 outline-none focus:ring-2 ring-sky-400"
          placeholder="Your message..."
          v-model="message"
        />
        <button
          class="absolute flex justify-center items-center right-9 h-10 w-10 rounded-full bg-gradient-to-br bg-gradient cursor-pointer"
          @click.prevent="sendMessage"
        >
          <img src="../assets/Icons/Share.svg" alt="Send" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Message from "../components/Message.vue";
import User from "../components/User.vue";

export default {
  components: {
    Message,
    User,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("sendMessage", {
        message: this.message,
      });
      this.message = "";
    },
  },
};
</script>

<style></style>
