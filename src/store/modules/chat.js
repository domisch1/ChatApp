import { onAuthStateChanged } from "@firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

export default {
  state() {
    return {
      activeChat: {},
      messages: [],
      messageSize: 0,
    };
  },
  getters: {
    filteredMessages(state) {
      return state.messages.sort((a, b) => {
        return a.index - b.index;
      });
    },
  },
  mutations: {
    setActiveChat(state, payload) {
      state.activeChat = {};
      state.activeChat = {
        docID: payload.docID,
        email: payload.email,
        username: payload.username,
        partner1: payload.partner1,
        partner2: payload.partner2,
      };
    },
    setActiveGroupChat(state, payload) {
      state.activeChat = {};
      state.activeChat = {
        groupID: payload.groupID,
        username: payload.groupname,
        emails: payload.emails,
        usernames: payload.usernames,
      };
    },
    updateMessageSize(state, payload) {
      state.messageSize = payload.messageSize;
    },
    setMessages(state, payload) {
      state.messages = [];
      payload.forEach((message) => {
        state.messages.push(message.data());
      });
    },
    resetMessages(state) {
      state.messages = [];
    },
  },
  actions: {
    async sendMessage(context, payload) {
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
          today =
            "0" + date.getDate() + ".0" + month + "." + date.getFullYear();
        } else {
          let month = date.getMonth() + 1;
          today = "0" + date.getDate() + "." + month + "." + date.getFullYear();
        }
      }
      await addDoc(
        collection(db, "chats", context.state.activeChat.docID, "messages"),
        {
          message: payload.message,
          sender: context.rootState.authModule.email,
          username: context.rootState.authModule.username,
          time: time,
          date: today,
          index: context.state.messageSize,
        }
      );
    },
    async openChat(context, payload) {
      context.commit("resetMessages");
      const chatRef = query(
        collection(db, "chats"),
        where("partner1", "==", payload.partner1),
        where("partner2", "==", payload.partner2)
      );
      const snapshot = await getDocs(chatRef);
      snapshot.forEach((doc) => {
        context.commit("setActiveChat", {
          docID: doc.ref.id,
          email: payload.email,
          username: payload.username,
          partner1: payload.partner1,
          partner2: payload.partner2,
        });
      });
      context.dispatch("getMessages");
    },
    getMessages(context) {
      const chatRef = query(
        collection(db, "chats", context.state.activeChat.docID, "messages")
      );
      const chatSub = onSnapshot(chatRef, (snap) => {
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
  },
};
