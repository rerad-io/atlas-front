import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        supportedLngs: ["en", "ar-AE", "ko-KR", "ru-KZ"],
        interpolation: {
            escapeValue: false,
        },
        backend: {
            // Load translations from multiple JSON files
            loadPath: "/app/locales/{{lng}}/{{ns}}.json",
        },
    });
