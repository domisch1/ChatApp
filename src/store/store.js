import { createStore } from "vuex";
import authModule from "./modules/auth";
import userHandlingModule from "./modules/userHandling";
import chatModule from "./modules/chat";
import groupModule from "./modules/group";

const store = createStore({
  state() {
    return {};
  },
  getters: {},
  mutations: {
    resetAll(state) {
      state.userAuth = false;
      state.username = "";
      state.email = "";
      state.componentKeyCreateGroup = 0;
      state.componentKeyAddUser = 0;
      state.userList = [];
      state.addedUsers = [];
      state.userListGroup = [];
      state.userGroup = [];
      state.addedGroups = [];
      state.activeChat = {};
      state.messages = [];
      state.messageSize = 0;
    },
  },
  actions: {},
  modules: {
    authModule: authModule,
    userHandlingModule: userHandlingModule,
    chatModule: chatModule,
    groupModule: groupModule,
  },
});

export default store;
