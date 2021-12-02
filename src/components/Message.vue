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

<template>
  <section class="partner-container" :class="{ 'my-container': messageSender }">
    <div class="partner-message" :class="{ 'my-message': messageSender }">
      <p class="text-base">{{ messageContent }}</p>
    </div>
    <span class="text-xs"> {{ messageTime }} </span>
  </section>
</template>

<style>
.container-base {
  @apply flex flex-col font-main mb-4 w-full;
}
.partner-container {
  @apply container-base justify-start;
}
.my-container {
  @apply container-base items-end;
}
.message-base {
  @apply flex px-4 py-3 max-w-2/3 rounded mb-1;
}
.partner-message {
  @apply message-base justify-start bg-purple-100;
}
.my-message {
  @apply message-base justify-end bg-purple-300;
}
</style>
