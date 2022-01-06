import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import { auth, db } from "../firebase";
import router from "../router";

const store = createStore({
  state() {
    return {
      userAuth: false,
    };
  },
  getters: {},
  mutations: {
    setAuthTrue(state) {
      state.userAuth = true;
    },
    setAuthFalse(state) {
      state.userAuth = false;
    },
  },
  actions: {
    signUp(context, user) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((user) => {
          context.commit("setAuthTrue");
          console.log(user);
          router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login(context, user) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((user) => {
          context.commit("setAuthTrue");
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
          context.commit("setAuthFalse");
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
          context.commit("setAuthTrue");
          console.log(user);
          router.push("/home");
        } else {
          context.commit("setAuthFalse");
          // router.push("/");
        }
      });
    },
  },
});

export default store;
