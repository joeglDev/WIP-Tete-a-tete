import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Main from "../components/Main.vue";
import Home from "../components/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    // {
    //   path: "/chatboard",
    //   name: "chatboard",
    //   component: ChatBoard,
    // },
    // {
    //   path: "/dialogue",
    //   name: "dialogue",
    //   component: Dialogue,
    // },
  ],
});

export default router;
