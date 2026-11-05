import { useTranslation } from "react-i18next";

import logo from "@/assets/images/logo.jpg";
import { TranslationKeys } from "@/i18n/TranslationKeys";


export default function TopLogo() {
    const { t } = useTranslation();

    return (
        <div id="header-top-logo" className="header-top-logo">
            <img src={ logo } alt="Camping Robinson Country Club logo" />
            <h1>{ t(TranslationKeys.PAGE_NAME) }</h1>
        </div>
    );
}
