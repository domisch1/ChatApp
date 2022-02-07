import { onAuthStateChanged } from "@firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

export default {
  state() {
    return {
      componentKeyAddUser: 0,
      userList: [],
      addedUsers: [],
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
  },
  mutations: {
    setUserList(state, payload) {
      state.userList = [];
      payload.forEach((user) => {
        if (user.data().email !== this.state.authModule.email) {
          state.userList.push(user.data());
        }
      });
    },
    setAddedUsers(state, payload) {
      state.addedUsers = [];
      payload.forEach((user) => {
        state.addedUsers.push(user.data());
      });
    },
    renderPage(state) {
      state.componentKeyAddUser += 1;
    },
  },
  actions: {
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
      const email = context.rootState.authModule.email;
      const avatar = payload.username[0].toUpperCase();
      await setDoc(doc(db, "users", email, "addedUsers", payload.email), {
        email: payload.email,
        username: payload.username,
        avatar: avatar,
        partner1: email,
        partner2: payload.email,
      });
      await setDoc(doc(db, "users", payload.email, "addedUsers", email), {
        email: email,
        username: context.rootState.authModule.username,
        avatar: avatar,
        partner1: email,
        partner2: payload.email,
      });
      await addDoc(collection(db, "chats"), {
        partner1: email,
        partner1Username: context.rootState.authModule.username,
        partner2: payload.email,
        partner2Username: payload.username,
      });
      context.commit("renderPage");
    },
    getData(context) {
      const email = context.rootState.authModule.email;
      const usersRef = query(collection(db, "userList"));
      const usersSub = onSnapshot(usersRef, (snap) => {
        context.commit("setUserList", snap);
      });
      const addedUsersRef = query(collection(db, "users", email, "addedUsers"));
      const addedUsersSub = onSnapshot(addedUsersRef, (snap) => {
        context.commit("setAddedUsers", snap);
        context.commit("setUserListGroup", snap);
      });
      const groupRef = query(
        collection(db, "groups"),
        where("userEmails", "array-contains", email)
      );
      const groupsSub = onSnapshot(groupRef, (snap) => {
        context.commit("setAddedGroups", snap);
      });
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          usersSub();
          addedUsersSub();
          groupsSub();
        }
      });
    },
  },
};
