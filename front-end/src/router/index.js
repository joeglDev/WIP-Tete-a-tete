import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Main from "../components/Main.vue";
import Home from "../components/Home.vue";
import FullChatBoard from "../components/FullChatBoard.vue";
import Dialogue from "../components/Dialogue.vue"

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
    { path: "/trending", name: "trending", component: FullChatBoard },
  
    {
      path: "/chat",
      name: "dialogue",
      component: Dialogue,
      props: true,
    },
  ],
});

export default router;
