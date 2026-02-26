import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { currentUser, logout, loading } = useAuth();
    const location = useLocation();

    const getLinkClass = (path) => {
        const base = "transition-all duration-300 text-sm font-medium relative py-1";
        const isActive = location.pathname === path;
        const active = isActive ? "text-primary" : "text-gray-600 hover:text-primary";

        // Add underline effect for active state
        return `${base} ${active} ${isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full after:animate-fade-in" : ""}`;
    };

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2" id="top">
                        <div className="h-8 sm:h-10 overflow-hidden flex items-start">
                            <img
                                src="/images/logo.svg"
                                alt="Uniquity logo"
                                className="h-16 sm:h-20 w-auto"
                            />
                        </div>
                    </NavLink>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className={getLinkClass('/')}>
                            Home
                        </NavLink>
                        <NavLink to="/analyze#analyze" className={getLinkClass('/analyze')}>
                            Analyze
                        </NavLink>
                        <NavLink to="/history" className={getLinkClass('/history')}>
                            History
                        </NavLink>
                        <NavLink to="/about" className={getLinkClass('/about')}>
                            About
                        </NavLink>
                    </div>

                    {/* Auth UI */}
                    <div className="hidden md:flex items-center">
                        {!loading && (
                            currentUser ? (
                                <div className="flex items-center gap-4 animate-fade-in">
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 py-1 pl-1 pr-3 rounded-full shadow-sm">
                                        {currentUser.photoURL ? (
                                            <img src={currentUser.photoURL} alt="Avatar" className="w-7 h-7 rounded-full" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                                                {currentUser.displayName?.charAt(0) || (currentUser.email?.charAt(0) ?? 'U')}
                                            </div>
                                        )}
                                        <span className="text-xs font-medium text-gray-700 max-w-[140px] truncate">
                                            {currentUser.displayName || currentUser.email}
                                        </span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-gray-400 hover:text-danger hover:bg-danger/5 transition-colors duration-200 rounded-full"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="px-5 py-2 text-sm font-medium text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 focus:ring-2 focus:ring-primary/50 focus:outline-none animate-fade-in"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-slide-up">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <NavLink
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/analyze#analyze"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Analyze
                        </NavLink>
                        <NavLink
                            to="/history"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            History
                        </NavLink>
                        <NavLink
                            to="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            About
                        </NavLink>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            {!loading && (
                                currentUser ? (
                                    <div className="flex items-center justify-between px-3 py-2">
                                        <div className="flex items-center gap-3">
                                            {currentUser.photoURL && <img src={currentUser.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />}
                                            <span className="text-sm font-medium text-gray-700">{currentUser.displayName || currentUser.email}</span>
                                        </div>
                                        <button onClick={logout} className="text-sm font-medium text-danger hover:underline">Logout</button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/signin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full text-center px-3 py-2 text-white bg-primary font-medium hover:bg-primary/90 rounded-md transition-colors"
                                    >
                                        Sign in with Google
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
