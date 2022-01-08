<template>
  <section class="partner-container" :class="{ 'my-container': myMessage }">
    <div class="partner-message" :class="{ 'my-message': myMessage }">
      <p class="text-base">{{ messageContent }}</p>
    </div>
    <span class="text-xs"> {{ messageTime + ", " + messageDate }} </span>
  </section>
</template>

<script>
export default {
  props: ["messageClass", "message", "time", "date"],
  data() {
    return {
      messageSender: this.messageClass,
      messageContent: this.message,
      messageTime: this.time,
      messageDate: this.date,
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
  },
};
</script>

<style></style>
