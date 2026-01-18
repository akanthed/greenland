"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { usePerspective } from "@/lib/context/PerspectiveContext";
import { PerspectiveToggle } from "./PerspectiveToggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/story", label: "Story" },
    { href: "/data", label: "Data" },
    { href: "/games", label: "Games" },
    { href: "/polls", label: "Polls" },
    { href: "/about", label: "About" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showPerspectiveMenu, setShowPerspectiveMenu] = useState(false);
    const pathname = usePathname();
    const { perspectiveInfo } = usePerspective();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <>
            <header
                className={`nav-header transition-all duration-300 ${isScrolled ? "glass-dark shadow-lg" : "bg-transparent"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-arctic-ice to-glacier-white flex items-center justify-center">
                        <span className="text-deep-navy font-bold text-lg">G</span>
                    </div>
                    <span className="text-glacier-white font-heading font-bold text-lg hidden sm:block group-hover:text-arctic-ice transition-colors">
                        GREENLAND
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? "active" : ""
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                    {/* Perspective indicator - Desktop */}
                    <button
                        onClick={() => setShowPerspectiveMenu(!showPerspectiveMenu)}
                        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-glacier-white"
                        aria-label="Change perspective"
                    >
                        <span className="w-6 h-6 flex items-center justify-center text-lg">{perspectiveInfo.icon}</span>
                        <span className="text-sm font-medium">{perspectiveInfo.label}</span>
                        <Globe className="w-4 h-4 opacity-70" />
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-glacier-white"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-glacier-white"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </header>

            {/* Perspective Menu Dropdown */}
            <AnimatePresence>
                {showPerspectiveMenu && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[90]"
                            onClick={() => setShowPerspectiveMenu(false)}
                        />
                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="fixed top-20 right-48 z-[95] w-80"
                        >
                            <PerspectiveToggle onSelect={() => setShowPerspectiveMenu(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm z-[150] bg-deep-navy shadow-2xl"
                    >
                        <div className="flex flex-col h-full pt-24 pb-8 px-6">
                            {/* Mobile Nav Links */}
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-4 px-4 rounded-lg text-lg font-medium transition-colors ${pathname === link.href
                                                ? "bg-glacier-white text-deep-navy"
                                                : "text-glacier-white hover:bg-white/10"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Perspective selector in mobile menu */}
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <p className="text-sm text-white/60 mb-4 px-4">View Perspective</p>
                                <PerspectiveToggle
                                    onSelect={() => setIsMobileMenuOpen(false)}
                                    compact
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[140] bg-black/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
