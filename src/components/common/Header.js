import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import LogoImg from "../../img/logo3.png";

const navLinks = [
    { to: "/",      label: "Home"  },
    { to: "/about", label: "About" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`app-header${scrolled ? " app-header--scrolled" : ""}`}>
            {/* Brand */}
            <Link to="/" className="app-header-brand" onClick={() => setMenuOpen(false)}>
                <img src={LogoImg} alt="logo" className="app-header-logo" />
                <span className="app-header-brand-text">Bhagavad Gita</span>
            </Link>

            {/* Desktop nav */}
            <ul className="app-header-nav">
                {navLinks.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end
                            className={({ isActive }) =>
                                `app-header-link${isActive ? " app-header-link--active" : ""}`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Hamburger */}
            <button
                className={`app-header-hamburger${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>

            {/* Mobile drawer */}
            {menuOpen && (
                <div className="app-header-drawer">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            className={({ isActive }) =>
                                `app-header-drawer-link${isActive ? " app-header-link--active" : ""}`
                            }
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Header;
