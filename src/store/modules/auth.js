import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "@firebase/auth";

import { auth } from "../../firebase";
import router from "../../router";

export default {
  state() {
    return {
      userAuth: false,
      username: "",
      email: "",
    };
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
        .then((data) => {
          context.commit("setAuth", true);
          context.commit("setUsername", {
            username: data.user.displayName,
            email: data.user.email,
          });
          console.log(data);
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
        }
      });
    },
  },
};
