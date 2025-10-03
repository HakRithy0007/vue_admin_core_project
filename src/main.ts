import { createApp } from "vue";
import App from "@/App.vue";
import { registerPlugins } from "@/@core/utils/plugins";
import "@/@core/scss/template/index.scss";
import "@/@layouts/styles/index.scss";
import "vue3-perfect-scrollbar/style.css";
import "@/assets/styles/index.css";
import "@/assets/font/Battambang-Black.ttf";
import "@/assets/font/Koulen-Regular.ttf";
import "@/assets/font/Poppins-Medium.ttf";
import i18n from "@/translate/i18n";

const app = createApp(App);


registerPlugins(app);
app.use(i18n);
app.mount("#app");
