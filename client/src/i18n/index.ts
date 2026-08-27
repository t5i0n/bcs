import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import zh from "./locales/zh.json";
import am from "./locales/am.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  zh: { translation: zh },
  am: { translation: am },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Apply RTL/LTR direction based on language
export function applyDirection(lang: string) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

// Initialize direction on load
applyDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
  applyDirection(lng);
});

export default i18n;
