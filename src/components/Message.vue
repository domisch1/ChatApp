<template>
  <section class="partner-container" :class="{ 'my-container': messageSender }">
    <div class="partner-message" :class="{ 'my-message': messageSender }">
      <p class="text-base">{{ messageContent }}</p>
    </div>
    <span class="text-xs"> {{ messageTime }} </span>
  </section>
</template>

<script>
export default {
  props: ["messageClass", "message", "time"],
  data() {
    return {
      messageSender: this.messageClass,
      messageContent: this.message,
      messageTime: this.time,
    };
  },
};
</script>

<style></style>
