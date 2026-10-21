import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import en from "@/assets/locales/en/translation.json";
import hu from "@/assets/locales/hu/translation.json";
import ro from "@/assets/locales/ro/translation.json";


// ----------------------------------------------------------------------------------------
// Languages
// ----------------------------------------------------------------------------------------
const LANGUAGES = [
    { code: "en", label: "English", locale: "en-US" },
    { code: "hu", label: "Magyar", locale: "hu-HU" },
    { code: "ro", label: "Română", locale: "ro-RO" },
] as const;

/* The union of all supported language codes. */
export type SupportedLanguage = (typeof LANGUAGES)[number]["code"];

export type LanguageOption = Pick<(typeof LANGUAGES)[number], "code" | "label">;

/* Returns the supported languages as a list of LanguageOption objects. */
export function getLanguageOptions(): LanguageOption[] {
    return LANGUAGES.map((language) => ({ code: language.code, label: language.label }));
}

// ----------------------------------------------------------------------------------------
// i18next setup
// ----------------------------------------------------------------------------------------

// Keep the lang attribute of the <html> element in sync (screen readers, translators).
// It is registered before init(), so the language detected at the start is set too.
i18n.on("languageChanged", (language) => {
    document.documentElement.lang = i18n.resolvedLanguage ?? language;
});

// Only initialize i18next if it hasn't been initialized yet.
if (!i18n.language) {
    await i18n
        .use(LanguageDetector)  // the browser language, and the last choice from localStorage
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: en },
                hu: { translation: hu },
                ro: { translation: ro },
            },
            supportedLngs: LANGUAGES.map(lang => lang.code) as SupportedLanguage[],
            fallbackLng: "en",                     // Default to en
            load: "languageOnly",
            interpolation: { escapeValue: false }, // React already escapes the values
            detection: {
                order: ["localStorage", "navigator", "htmlTag"],
                caches: ["localStorage"]
            },
        });
}

export default i18n;
