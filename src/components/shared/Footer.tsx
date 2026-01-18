"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
    about: {
        title: "About",
        links: [
            { label: "Our Mission", href: "/about" },
            { label: "Team", href: "/about#team" },
            { label: "Methodology", href: "/about#methodology" },
            { label: "Contact", href: "mailto:akshay.kanthed007@gmail.com", external: true },
        ],
    },
    sections: {
        title: "Explore",
        links: [
            { label: "The Story", href: "/story" },
            { label: "Interactive Data", href: "/data" },
            { label: "Games & Quizzes", href: "/games" },
            { label: "Live Polls", href: "/polls" },
        ],
    },
    data: {
        title: "Data Sources",
        links: [
            { label: "NASA Climate Data", href: "https://climate.nasa.gov", external: true },
            { label: "NOAA Arctic Report", href: "https://arctic.noaa.gov", external: true },
            { label: "Statistics Greenland", href: "https://stat.gl", external: true },
            { label: "USGS Resources", href: "https://usgs.gov", external: true },
        ],
    },
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-grid">
                {/* About Column */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-glacier-white">
                        {footerLinks.about.title}
                    </h3>
                    <ul className="space-y-3">
                        {footerLinks.about.links.map((link) => (
                            <li key={link.href}>
                                {link.external ? (
                                    <a
                                        href={link.href}
                                        className="text-glacier-white/70 hover:text-glacier-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-glacier-white/70 hover:text-glacier-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sections Column */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-glacier-white">
                        {footerLinks.sections.title}
                    </h3>
                    <ul className="space-y-3">
                        {footerLinks.sections.links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-glacier-white/70 hover:text-glacier-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Data Sources Column */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-glacier-white">
                        {footerLinks.data.title}
                    </h3>
                    <ul className="space-y-3">
                        {footerLinks.data.links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-glacier-white/70 hover:text-glacier-white transition-colors inline-flex items-center gap-1"
                                >
                                    {link.label}
                                    <span className="text-xs">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-glacier-white/20 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-glacier-white/60">
                    © {currentYear} Greenland: The Untold Story. All rights reserved.
                </p>
                <p className="text-sm text-glacier-white/60 flex items-center gap-1">
                    Made with <Heart className="w-4 h-4 text-urgent-red fill-current" /> for the planet
                </p>
                <div className="flex gap-6">
                    <Link
                        href="/privacy"
                        className="text-sm text-glacier-white/60 hover:text-glacier-white transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms"
                        className="text-sm text-glacier-white/60 hover:text-glacier-white transition-colors"
                    >
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}
