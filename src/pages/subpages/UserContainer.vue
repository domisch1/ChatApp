<template>
  <section class="flex flex-col w-full">
    <User
      v-for="(user, index) in this.$store.state.userHandlingModule.addedUsers"
      :key="index"
      :userName="user.username"
      :avatar="user.avatar"
      @click="openChat(user.email, user.username, user.partner1, user.partner2)"
    ></User>
    <Group
      v-for="(group, index) in this.$store.state.groupModule.addedGroups"
      :key="index"
      :group="group.groupname"
      :avatar="group.avatar"
      :id="group.groupID"
      @click="
        openGroupChat(
          group.groupID,
          group.groupname,
          group.userEmails,
          group.userNames
        )
      "
    ></Group>
  </section>
</template>

<script>
import User from "../../components/User.vue";
import Group from "../../components/Group.vue";

export default {
  components: {
    User,
    Group,
  },
  methods: {
    openChat(email, username, partner1, partner2) {
      this.$store.dispatch("openChat", {
        email: email,
        username: username,
        partner1: partner1,
        partner2: partner2,
      });
    },
    openGroupChat(groupID, groupname, emails, usernames) {
      this.$store.dispatch("openGroupChat", {
        groupID: groupID,
        groupname: groupname,
        emails: emails,
        usernames: usernames,
      });
    },
  },
};
</script>

<style></style>
