import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import UserPage from "@/pages/UserPage.vue";
import UserAuditPage from "@/pages/UserAuditPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "dashboard", name: "dashboard", component: DashboardPage },
      { path: "user", name: "user", component: UserPage },
      { path: "user-audit", name: "user-audit", component: UserAuditPage },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
