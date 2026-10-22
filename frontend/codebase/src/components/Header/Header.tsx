import { useTranslation } from "react-i18next";

import logo from "@/assets/images/logo.jpg";
import Languages from "@/components/Languages/Languages";
import { TranslationKeys } from "@/i18n/TranslationKeys";

import "./Header.css";


export default function Header() {
    const { t } = useTranslation();

    return (
        <header className="header">
            <button type="button" className="header-mobile-menu-button" aria-label={ t(TranslationKeys.HEADER_DETAILS.TOGGLE_MENU) }>
                ≡ { t(TranslationKeys.HEADER_DETAILS.MENU) }
            </button>
            <div className="header-mobile-menu-container">
                {/* Menu bar */}
                <div className="header-top-container">
                    <div id="header-top-logo" className="header-top-logo">
                        <img src={ logo } alt="Camping Robinson Country Club logo" />
                        <h1>{ t(TranslationKeys.PAGE_NAME) }</h1>
                    </div>
                    <div className="header-top-menu">
                        <Languages className="header-top-language" />
                    </div>
                </div>
                {/* Navigation bar */}
                <div className="header-nav-container">
                    <nav className="header-nav-menu">
                        <ul className="header-menu">
                            <li><a href="#">{ t(TranslationKeys.HEADER_DETAILS.HOME) }</a></li>
                            <li><a href="#footer">{ t(TranslationKeys.HEADER_DETAILS.CONTACT) }</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
