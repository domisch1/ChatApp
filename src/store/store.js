import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "@firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
} from "@firebase/firestore";
import { auth, db } from "../firebase";
import router from "../router";

const store = createStore({
  state() {
    return {
      userAuth: false,
      username: "",
      email: "",
      componentKeyCreateGroup: 0,
      componentKeyAddUser: 0,
      userList: [],
      addedUsers: [],
      userListGroup: [],
      userGroup: [],
      activeChat: {},
      messages: [],
      messageSize: 0,
    };
  },
  getters: {
    filteredUsers(state) {
      let copy = [];
      for (let y = 0; y < state.userList.length; y++) {
        copy.push(state.userList[y]);
      }
      for (let i = 0; i < state.addedUsers.length; i++) {
        for (let j = 0; j < copy.length; j++) {
          if (copy[j].email === state.addedUsers[i].email) {
            copy.splice(j, 1);
          }
        }
      }
      return copy;
    },
    filteredMessages(state) {
      return state.messages.sort((a, b) => {
        return a.index - b.index;
      });
    },
  },
  mutations: {
    setAuth(state, payload) {
      if (payload) {
        state.userAuth = true;
      } else {
        state.userAuth = false;
      }
    },
    setUsername(state, payload) {
      if (payload) {
        state.username = payload.username;
        state.email = payload.email;
      } else {
        state.username = "";
        state.email = "";
      }
    },
    setUserList(state, payload) {
      state.userList = [];
      payload.forEach((user) => {
        if (user.data().email !== state.email) {
          state.userList.push(user.data());
        }
      });
    },
    setAddedUsers(state, payload) {
      state.addedUsers = [];
      payload.forEach((user) => {
        state.addedUsers.push(user.data());
      });
      payload.forEach((user) => {
        state.userListGroup.push(user.data());
      });
    },
    renderPage(state) {
      state.componentKeyAddUser += 1;
    },
    setGroup(state, payload) {
      console.log(payload.index);
      state.userListGroup.splice(payload.index, 1);
      console.log(state.userListGroup);
      state.userGroup.push(payload);
      state.componentKeyCreateGroup += 1;
    },
    setActiveChat(state, payload) {
      state.activeChat = {
        docID: payload.docID,
        email: payload.email,
        username: payload.username,
        partner1: payload.partner1,
        partner2: payload.partner2,
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
    resetAll(state) {
      state.userAuth = false;
      state.username = "";
      (state.email = ""), (state.componentKeyCreateGroup = 0);
      state.componentKeyAddUser = 0;
      state.userList = [];
      state.addedUsers = [];
      state.userListGroup = [];
      state.userGroup = [];
      state.activeChat = {};
      state.messages = [];
      state.messageSize = 0;
    },
  },
  actions: {
    signUp(context, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.commit("setAuth", true);
          context.commit("setUsername", {
            username: payload.username,
            email: payload.email,
          });
          updateProfile(auth.currentUser, {
            displayName: payload.username,
          });
          console.log(user);
          router.push("/home");
          context.dispatch("setUser", {
            email: payload.email,
            username: payload.username,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login(context, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.commit("setAuth", true);
          context.commit("setUsername", {
            username: user.user.displayName,
            email: user.user.email,
          });
          console.log(user);
          router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout(context) {
      signOut(auth)
        .then(() => {
          context.commit("setAuth");
          context.commit("setUsername");
          context.commit("resetAll");
          console.log("signed out");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    watchAuth(context) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit("setAuth", true);
          context.commit("setUsername", {
            username: user.displayName,
            email: user.email,
          });
          context.dispatch("getData");
          console.log(user);
          router.push("/home");
        } else {
          context.commit("setAuth");
          context.commit("setUsername");
          context.commit("resetAll");
          // router.push("/");
        }
      });
    },
    async setUser(context, payload) {
      await setDoc(doc(db, "userList", payload.email), {
        email: payload.email,
        username: payload.username,
      });
      await setDoc(doc(db, "users", payload.email), {
        email: payload.email,
        username: payload.username,
      });
    },
    async addUser(context, payload) {
      const email = context.state.email;
      const avatar = payload.username[0].toUpperCase();
      console.log(avatar);
      await setDoc(doc(db, "users", email, "addedUsers", payload.email), {
        email: payload.email,
        username: payload.username,
        avatar: avatar,
        partner1: email,
        partner2: payload.email,
      });
      await setDoc(doc(db, "users", payload.email, "addedUsers", email), {
        email: email,
        username: context.state.username,
        avatar: avatar,
        partner1: email,
        partner2: payload.email,
      });
      await addDoc(collection(db, "chats"), {
        partner1: email,
        partner1Username: context.state.username,
        partner2: payload.email,
        partner2Username: payload.username,
      });
      context.commit("renderPage");
    },
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
          sender: context.state.email,
          username: context.state.username,
          time: time,
          date: today,
          index: context.state.messageSize,
        }
      );
      console.log(time + ", " + today);
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
    getData(context) {
      const email = context.state.email;
      const usersRef = query(collection(db, "userList"));
      const usersSub = onSnapshot(usersRef, (snap) => {
        context.commit("setUserList", snap);
      });
      const addedUsersRef = query(collection(db, "users", email, "addedUsers"));
      const addedUsersSub = onSnapshot(addedUsersRef, (snap) => {
        context.commit("setAddedUsers", snap);
      });
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          usersSub();
          addedUsersSub();
        }
      });
    },
  },
});

export default store;
