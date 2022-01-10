<template>
  <section class="partner-container" :class="{ 'my-container': myMessage }">
    <span class="text-base" v-if="checkGroupActive"> {{ username }} </span>
    <div class="partner-message" :class="{ 'my-message': myMessage }">
      <p class="text-base">{{ messageContent }}</p>
    </div>
    <span class="text-xs"> {{ messageTime + ", " + messageDate }} </span>
  </section>
</template>

<script>
export default {
  props: ["messageClass", "message", "time", "date", "user"],
  data() {
    return {
      messageSender: this.messageClass,
      messageContent: this.message,
      messageTime: this.time,
      messageDate: this.date,
      username: this.user,
    };
  },
  computed: {
    myMessage() {
      if (this.messageSender === this.$store.state.authModule.email) {
        return true;
      } else {
        return false;
      }
    },
    checkGroupActive() {
      if (this.$store.state.chatModule.activeChat.groupID !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
