import { useTranslation } from "react-i18next";
import { getLanguageOptions } from "@/i18n";
import { TranslationKeys } from "@/i18n/TranslationKeys";


export default function Languages({ className }: { className?: string }) {
    const { t, i18n } = useTranslation();
    const languageOptions = getLanguageOptions();
    const defaultLanguage: string = "en";

    const changeLanguage = (language: string) => {
        void i18n.changeLanguage(language);
    };

    return (
        <select
            name="languages"
            className={ className || 'languages' }
            aria-label={ t(TranslationKeys.HEADER_DETAILS.LANGUAGE) }
            value={ i18n.resolvedLanguage ?? defaultLanguage }
            onChange={ (e) => changeLanguage(e.target.value) }
        >
            {
                languageOptions.map((language) => (
                    <option key={language.code} value={ language.code }>
                        { language.label }
                    </option>
                ))
            }
        </select>
    );
}
