import { createI18n } from "vue-i18n";
import type { I18n } from "vue-i18n";
import km from "./km.json";
import en from "./en.json";

const savedLanguage = localStorage.getItem("lang") || "en";

const messages = { en, km };

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLanguage,
  fallbackLocale: "km",
  messages,
}) as I18n;

document.documentElement.lang = savedLanguage;
export default i18n;
