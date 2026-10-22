import "i18next";
import type en from "@/assets/locales/en/translation.json";


/** This is a module extension. The useTranslation only accepts 'en/translation.json' keys. **/
declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: { translation: typeof en };
    }
}
