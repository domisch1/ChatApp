import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  onSnapshot,
} from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { db, auth } from "../../firebase";
export default {
  state() {
    return {
      componentKeyCreateGroup: 0,
      userListGroup: [],
      userGroup: [],
      addedGroups: [],
    };
  },
  getters: {},
  mutations: {
    setUserListGroup(state, payload) {
      payload.forEach((user) => {
        state.userListGroup.push(user.data());
      });
    },
    setGroup(state, payload) {
      state.userListGroup.splice(payload.index, 1);
      state.userGroup.push(payload);
      state.componentKeyCreateGroup += 1;
    },
    deleteUserGroup(state, payload) {
      state.userListGroup.push(state.userGroup[payload.index]);
      state.userGroup.splice(payload.index, 1);
      state.componentKeyCreateGroup += 1;
    },
    resetGroup(state) {
      let i = 0;
      state.userGroup.forEach((user) => {
        state.userListGroup.push(user);
        state.userGroup.splice(i, 1);
        i++;
      });
      state.componentKeyCreateGroup += 1;
    },
    setAddedGroups(state, payload) {
      state.addedGroups = [];
      payload.forEach((group) => {
        state.addedGroups.push({
          groupID: group.ref.id,
          groupname: group.data().groupname,
          avatar: group.data().avatar,
          userEmails: group.data().userEmails,
          userNames: group.data().userNames,
        });
        console.log(state.addedGroups);
      });
    },
  },
  actions: {
    async createGroup(context, payload) {
      const email = context.rootState.authModule.email;
      const username = context.rootState.authModule.username;
      const avatar = payload.groupname[0].toUpperCase();
      let userEmails = [email];
      let userNames = [username];
      context.state.userGroup.forEach((user) => {
        userEmails.push(user.email);
        userNames.push(user.username);
      });
      await addDoc(collection(db, "groups"), {
        groupname: payload.groupname,
        avatar: avatar,
        userEmails: userEmails,
        userNames: userNames,
      });
      context.commit("resetGroup");
    },
    async openGroupChat(context, payload) {
      context.commit("resetMessages");
      // const groupChatRef = doc(db, "groups", payload.groupID);
      // const snapshot = await getDocs(groupChatRef);
      console.log(payload);
      // snapshot.forEach((doc) => {
      context.commit("setActiveGroupChat", {
        groupID: payload.groupID,
        groupname: payload.groupname,
        emails: payload.emails,
        usernames: payload.usernames,
      });
      // });
      context.dispatch("getGroupMessages");
    },
    getGroupMessages(context) {
      console.log(context.rootState.chatModule.activeChat.groupID);
      const groupChatRef = query(
        collection(
          db,
          "groups",
          context.rootState.chatModule.activeChat.groupID,
          "messages"
        )
      );
      const chatSub = onSnapshot(groupChatRef, (snap) => {
        context.commit("updateMessageSize", {
          messageSize: snap.size,
        });
        context.commit("setMessages", snap);
      });
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          chatSub();
        }
      });
    },
    async sendGroupMessage(context, payload) {
      const date = new Date();
      let time;
      let today;
      if (date.getSeconds() < 10) {
        time =
          date.getHours() + ":" + date.getMinutes() + ":0" + date.getSeconds();
      } else {
        time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      }
      if (date.getDate() < 10) {
        if (date.getMonth() < 10) {
          let month = date.getMonth() + 1;
          today =
            "0" + date.getDate() + ".0" + month + "." + date.getFullYear();
        } else {
          let month = date.getMonth() + 1;
          today = "0" + date.getDate() + "." + month + "." + date.getFullYear();
        }
      } else {
        if (date.getMonth() < 10) {
          let month = date.getMonth() + 1;
          today = date.getDate() + ".0" + month + "." + date.getFullYear();
        } else {
          let month = date.getMonth() + 1;
          today = date.getDate() + "." + month + "." + date.getFullYear();
        }
      }
      await addDoc(
        collection(
          db,
          "groups",
          context.rootState.chatModule.activeChat.groupID,
          "messages"
        ),
        {
          message: payload.message,
          sender: context.rootState.authModule.email,
          username: context.rootState.authModule.username,
          time: time,
          date: today,
          index: context.rootState.chatModule.messageSize,
        }
      );
    },
  },
};
