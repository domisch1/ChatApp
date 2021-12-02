import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import UserContainer from "./pages/subpages/UserContainer.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/login", component: () => import("./pages/Login.vue") },
  { path: "/signup", component: () => import("./pages/SignUp.vue") },
  {
    path: "/home",
    component: () => import("./pages/Home.vue"),
    children: [
      { path: "", component: UserContainer },
      {
        path: "add-user",
        component: () => import("./pages/subpages/AddUser.vue"),
      },
      {
        path: "create-group",
        component: () => import("./pages/subpages/CreateGroup.vue"),
      },
      {
        path: "profile",
        component: () => import("./pages/subpages/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
