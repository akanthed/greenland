"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, ExternalLink } from "lucide-react";

interface BreakingNewsItem {
    id: string;
    headline: string;
    date: string;
    source: string;
    category: "politics" | "climate" | "economy";
    urgent?: boolean;
}

// Latest real news from January 2026
const breakingNews: BreakingNewsItem[] = [
    {
        id: "tariffs-jan-2026",
        headline: "Trump announces 10-25% tariffs on 8 European nations until 'Complete and Total purchase of Greenland'",
        date: "Jan 17, 2026",
        source: "Multiple sources",
        category: "politics",
        urgent: true,
    },
    {
        id: "greenland-crisis",
        headline: "International 'Greenland Crisis' escalates as EU affirms solidarity with Denmark",
        date: "Jan 17, 2026",
        source: "The Guardian",
        category: "politics",
        urgent: true,
    },
    {
        id: "nato-deployment",
        headline: "European NATO allies send military personnel to Greenland for Arctic security",
        date: "Jan 2026",
        source: "Washington Post",
        category: "politics",
    },
    {
        id: "ice-loss-2025",
        headline: "2025 marks 29th consecutive year of Greenland Ice Sheet shrinkage - 105B tonnes lost",
        date: "Jan 2026",
        source: "NOAA Arctic Report",
        category: "climate",
    },
    {
        id: "tanbreez-funding",
        headline: "US Export-Import Bank offers $120M loan for Tanbreez rare earth mine",
        date: "Jun 2025",
        source: "CSIS",
        category: "economy",
    },
    {
        id: "greenland-not-for-sale",
        headline: "Greenlandic leaders reiterate: 'The island is not for sale'",
        date: "Jan 2026",
        source: "Al Jazeera",
        category: "politics",
    },
];

interface BreakingNewsBannerProps {
    className?: string;
}

export function BreakingNewsBanner({ className = "" }: BreakingNewsBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Check if already dismissed this session
        const dismissed = sessionStorage.getItem("news-banner-dismissed");
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        // Auto-rotate through headlines
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem("news-banner-dismissed", "true");
    };

    const currentNews = breakingNews[currentIndex];

    if (isDismissed) return null;

    const categoryColors = {
        politics: "from-urgent-red/90 to-orange-600/90",
        climate: "from-info/90 to-cyan-600/90",
        economy: "from-resource-gold/90 to-amber-600/90",
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed top-16 left-0 right-0 z-40 ${className}`}
        >
            <div className={`relative bg-gradient-to-r ${categoryColors[currentNews.category]} backdrop-blur-sm py-2`}>
                <div className="section-container flex items-center justify-between gap-4">
                    {/* Urgent indicator */}
                    {currentNews.urgent && (
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="flex-shrink-0"
                        >
                            <AlertCircle className="w-5 h-5 text-white" />
                        </motion.div>
                    )}

                    {/* Breaking label */}
                    <span className="flex-shrink-0 px-2 py-0.5 bg-white/20 rounded text-xs font-bold uppercase tracking-wider">
                        Breaking
                    </span>

                    {/* News content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentNews.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex-1 flex items-center gap-3 min-w-0"
                        >
                            <p className="text-sm font-medium text-white truncate">
                                {currentNews.headline}
                            </p>
                            <span className="flex-shrink-0 text-xs text-white/60">
                                {currentNews.date} • {currentNews.source}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation dots */}
                    <div className="flex-shrink-0 flex gap-1">
                        {breakingNews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Read more & dismiss */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <a
                            href="/story"
                            className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors"
                        >
                            <span>Full Story</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                            onClick={handleDismiss}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                            aria-label="Dismiss news banner"
                        >
                            <X className="w-4 h-4 text-white/80" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Current data facts component for embedding in pages
interface DataFactProps {
    className?: string;
}

export function LatestDataFacts({ className = "" }: DataFactProps) {
    const facts = [
        {
            label: "Ice Lost (2025)",
            value: "105B",
            unit: "tonnes",
            trend: "down",
            context: "29th consecutive year of shrinkage",
        },
        {
            label: "Rare Earth Value",
            value: "$280",
            unit: "trillion",
            trend: "up",
            context: "Kvanefjeld & Tanbreez deposits",
        },
        {
            label: "EU Tariff Threat",
            value: "10-25%",
            unit: "",
            trend: "warning",
            context: "Starting Feb 1, 2026",
        },
        {
            label: "Population Stand",
            value: "56K",
            unit: "people",
            trend: "neutral",
            context: "88% Inuit - 'Not for sale'",
        },
    ];

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
            {facts.map((fact) => (
                <div
                    key={fact.label}
                    className="bg-glacier-white/10 rounded-xl p-4 text-center relative overflow-hidden"
                >
                    {/* Trend indicator */}
                    <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${fact.trend === "up" ? "bg-success" :
                            fact.trend === "down" ? "bg-urgent-red" :
                                fact.trend === "warning" ? "bg-resource-gold animate-pulse" :
                                    "bg-glacier-white/50"
                        }`} />

                    <p className="text-sm text-glacier-white/60 mb-1">{fact.label}</p>
                    <p className="text-2xl font-bold text-glacier-white">
                        {fact.value}
                        <span className="text-sm font-normal text-glacier-white/70 ml-1">{fact.unit}</span>
                    </p>
                    <p className="text-xs text-glacier-white/50 mt-1">{fact.context}</p>
                </div>
            ))}
        </div>
    );
}
