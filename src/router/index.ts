import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuth } from "@/utils/authUtils";
import HomeView from "../views/HomeView.vue";
import UserLogin from "@/components/UserLogin.vue";
import UserRegistration from "@/components/UserRegistration.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/registration",
    name: "registration",
    component: UserRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && to.name !== "registration" && !isAuth()) {
    next({ name: "login" });
  } else if ((to.name === "login" || to.name === "registration") && isAuth()) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
