import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };

export default function (app: App) {
  app.use(router);
}
