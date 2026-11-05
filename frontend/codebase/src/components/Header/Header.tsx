import { useState } from "react";
import { useTranslation } from "react-i18next";

import Languages from "@/components/Languages/Languages";
import TopLogo from "@/components/TopLogo/TopLogo";
import { TranslationKeys } from "@/i18n/TranslationKeys";

import "./Header.css";


export default function Header() {
    const { t } = useTranslation();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    return (
        <header className="header">
            <button 
                type="button"
                className="header-mobile-menu-button"
                aria-label={ t(TranslationKeys.HEADER_DETAILS.TOGGLE_MENU) }
                aria-expanded={ menuIsOpen }
                aria-controls="header-mobile-menu"
                onClick={ () => setMenuIsOpen(!menuIsOpen) }
            >
                ≡ { t(TranslationKeys.HEADER_DETAILS.MENU) }
            </button>
            <div id="header-mobile-menu" className={ menuIsOpen ? "header-mobile-menu-container mobile-nav-bar-active" : "header-mobile-menu-container" }>
                {/* Menu bar */}
                <div className="header-top-container">
                    <TopLogo />
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
