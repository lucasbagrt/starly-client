import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import VueJwtDecode from "vue-jwt-decode";
import { useAuthStore } from "@/stores/auth-module";

const routes = [
  {
    meta: {
      title: "Restaurantes",
    },
    path: "/",
    name: "home",
    component: Home,
  },
  {
    meta: {
      title: "Restaurantes",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },  
  {
    meta: {
      title: "Usuários",
    },
    path: "/usuarios",
    name: "Usuários",
    component: () => import("@/views/User/UserList.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {  
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const userString = localStorage.getItem("user");
  if (authRequired && userString) {
    const user = JSON.parse(userString);
    var decoded = VueJwtDecode.decode(user.accessToken);
    var tokenExp = decoded ? new Date((decoded.exp ?? 0) * 1000) : null;

    var timeInHour = 1000 * 60 * 60;
    var dtNow = new Date();

    var diff = tokenExp - dtNow;
    if (diff / timeInHour < 1 && user.refreshToken) {
      const authStore = useAuthStore();
      authStore.setState();
      authStore
        .refreshToken({ refreshToken: user.refreshToken })
        .then(
          () => {
            router.push("/");
          },
          (error) => {
            router.push("/login");
          }
        );
    } else if (!user.refreshToken) {
      router.push("/login");
    }
  } else if (authRequired && !userString) {
    next("/login");
  }
  next();
});

export default router;
