import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import LogoImg from "../../img/logo3.png";
import { useAuth } from "../AuthContext";

const navLinks = [
    { to: "/",      label: "Home"  },
    { to: "/about", label: "About" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, loading, signInWithGoogle, signOutUser } = useAuth();

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

            {/* Auth — desktop */}
            <div className="app-header-auth">
                {!loading && (
                    user ? (
                        <div className="app-header-user">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="app-header-avatar"
                                referrerPolicy="no-referrer"
                            />
                            <span className="app-header-username">{user.displayName}</span>
                            <button className="app-header-signout" onClick={signOutUser}>
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <button className="app-header-signin" onClick={signInWithGoogle}>
                            <i className="fab fa-google" /> Sign in
                        </button>
                    )
                )}
            </div>

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

                    {!loading && (
                        user ? (
                            <>
                                <div className="app-header-drawer-user">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="app-header-avatar"
                                        referrerPolicy="no-referrer"
                                    />
                                    <span>{user.displayName}</span>
                                </div>
                                <button
                                    className="app-header-drawer-link"
                                    onClick={() => { signOutUser(); setMenuOpen(false); }}
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <button
                                className="app-header-drawer-link"
                                onClick={() => { signInWithGoogle(); setMenuOpen(false); }}
                            >
                                <i className="fab fa-google" /> Sign in with Google
                            </button>
                        )
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
