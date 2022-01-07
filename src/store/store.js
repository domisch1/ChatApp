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
  collection,
  onSnapshot,
  query,
} from "@firebase/firestore";
import { auth, db } from "../firebase";
import router from "../router";

const store = createStore({
  state() {
    return {
      userAuth: false,
      username: "",
      email: "",
      userList: [],
      addedUsers: [],
      userGroup: [],
      test: [],
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
    // filteredUsersGroup(state) {
    //   let copy = [];
    //   for (let y = 0; y < state.addedUsers.length; y++) {
    //     copy.push(state.addedUsers[y]);
    //   }
    //   for (let i = 0; i < state.userGroup.length; i++) {
    //     for (let j = 0; j < copy.length; j++) {
    //       if (copy[j].email === state.userGroup[i].email) {
    //         copy.splice(j, 1);
    //       }
    //     }
    //   }
    //   return copy;
    // },
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
    },
    setGroup(state, payload) {
      state.userGroup.push(payload);
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
