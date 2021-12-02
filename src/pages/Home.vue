<script>
import Header from "../components/Header.vue";
import User from "../components/User.vue";
import Message from "../components/Message.vue";
import InputRound from "../components/InputRound.vue";
import ButtonRound from "../components/ButtonRound.vue";

export default {
  components: {
    Header,
    User,
    Message,
    InputRound,
    ButtonRound,
  },
  data() {
    return {
      messages: [
        {
          content: "Hey there! What's going on?",
          time: "14:32 Uhr",
          myMessage: false,
        },
        {
          content: "Im good, thanks for asking. What about you?",
          time: "14:35 Uhr",
          myMessage: true,
        },
        {
          content: "By the way, have a great day!",
          time: "14:36 Uhr",
          myMessage: true,
        },
        {
          content: "Thanks, you too!",
          time: "14:39 Uhr",
          myMessage: false,
        },
        {
          content: "Im good, thanks for asking. What about you?",
          time: "14:35 Uhr",
          myMessage: true,
        },
        {
          content: "By the way, have a great day!",
          time: "14:36 Uhr",
          myMessage: true,
        },
        {
          content: "Thanks, you too!",
          time: "14:39 Uhr",
          myMessage: false,
        },
        {
          content: "Im good, thanks for asking. What about you?",
          time: "14:35 Uhr",
          myMessage: true,
        },
        {
          content: "By the way, have a great day!",
          time: "14:36 Uhr",
          myMessage: true,
        },
        {
          content: "Thanks, you too!",
          time: "14:39 Uhr",
          myMessage: false,
        },
      ],
    };
  },
};
</script>

<template>
  <section class="sm:grid grid-rows-8 grid-cols-3 w-screen h-screen">
    <Header class="sm:row-span-1 col-span-3 h-auto"></Header>
    <section
      class="
        row-span-7
        col-span-1
        flex flex-col
        border-r border-purple-600
        overflow-scroll
      "
    >
      <router-view class="bg-white z-50"></router-view>
    </section>
    <section
      class="
        col-span-2
        row-span-6
        sm:flex
        flex-col
        w-full
        hidden
        flex-auto
        px-6
        pt-6
        pb-2
        bg-gray-50
        overflow-scroll
      "
    >
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :messageClass="message.myMessage"
        :message="message.content"
        :time="message.time"
      ></Message>
    </section>
    <section
      class="
        col-span-2
        row-span-1
        sm:flex
        flex-row
        hidden
        items-center
        px-6
        bg-purple-900
        z-50
      "
    >
      <InputRound
        placeholder="Your message..."
        class="w-full pr-44 h-14"
      ></InputRound>
      <ButtonRound
        :content="'Send message'"
        class="absolute right-6 w-40 h-14"
      ></ButtonRound>
    </section>
  </section>
</template>

<style></style>
