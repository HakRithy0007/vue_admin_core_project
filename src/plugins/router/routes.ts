export const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/",
    component: () => import("@/layout/defaultLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
      },
      {
        path: "report",
        component: () => import("@/pages/ReportPage.vue"),
      },
      {
        path: "coin",
        component: () => import("@/pages/CoinPage.vue"),
      },
      {
        path: "handranking",
        component: () => import("@/pages/HandrankingPage.vue"),
      },
      {
        path: "memberaudit",
        component: () => import("@/pages/MemberAuditPage.vue"),
      },
      {
        path: "member",
        component: () => import("@/pages/MemberPage.vue"),
      },
      {
        path: "user",
        component: () => import("@/pages/UserPage.vue"),
      },
      {
        path: "useraudit",
        component: () => import("@/pages/UserAuditPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/blankLayout.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/pages/LoginPage.vue"),
      },

      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/ErrorPage.vue"),
      },
    ],
  },
];
