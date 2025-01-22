import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Home.vue";
import DeliveryList from "../views/DeliveryList.vue";
import DeliveryPage from "../views/DeliveryPage.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/deliveries",
    name: "DeliveryList",
    component: DeliveryList,
    meta: { requiresAuth: true },
  },
  {
    path: "/deliveries/new",
    name: "DeliveryForm",
    component: () => import("../views/DeliveryForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/deliveries/:id",
    name: "DeliveryPage",
    component: DeliveryPage,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
