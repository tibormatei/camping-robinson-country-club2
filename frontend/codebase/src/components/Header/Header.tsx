import logo from "@/assets/images/logo.jpg";

import "./Header.css";


export default function Header() {
    return (
        <header className="header">
            <button type="button" className="header-mobile-menu-button" aria-label="Toggle menu">≡</button>
            <div className="header-mobile-menu-container">
                {/* Menu bar */}
                <div className="header-top-container">
                    <div id="header-top-logo" className="header-top-logo">
                        <img src={logo} alt="Camping Robinson Country Club logo" />
                        <h1>Camping Robinson Country Club</h1>
                    </div>
                    <div className="header-top-menu">
                        <select className="header-top-language" aria-label="Language" defaultValue="en">
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                {/* Navigation bar */}
                <div className="header-nav-container">
                    <nav className="header-nav-menu">
                        <ul className="header-menu">
                            <li><a href="#">Home</a></li>
                            <li><a href="#footer">Contacts</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
