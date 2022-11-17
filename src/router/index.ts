import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import TasksView from "../views/TasksView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import { useUserDataStore } from "@/store/userData";
import { storeToRefs } from "pinia";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/user",
    name: "user",
    meta: { requiresAuth: true },
    children: [
      {
        path: "tasks",
        component: TasksView,
      },
      {
        path: "profile",
        component: ProfileView,
      },
    ],
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const userDataStore = useUserDataStore();
  const { isLoggedIn } = storeToRefs(userDataStore);
  const { checkIsUserLoggedIn } = userDataStore;

  console.log(isLoggedIn.value);
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
