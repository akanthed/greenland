"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Info, Share2 } from "lucide-react";

// Ice loss rate: ~267 billion tonnes per year = ~8,463 tonnes per SECOND
// Source: NASA/ESA satellite data, 2024 projections
const ICE_LOSS_TONNES_PER_SECOND = 8463;

// Convert to more relatable units
const OLYMPIC_POOLS_PER_SECOND = ICE_LOSS_TONNES_PER_SECOND / 2500; // ~3.4 pools
const ELEPHANTS_PER_SECOND = ICE_LOSS_TONNES_PER_SECOND / 6; // ~1411 elephants

interface IceMeltCounterProps {
    className?: string;
    variant?: "compact" | "full" | "hero";
    showSince?: boolean;
}

export function IceMeltCounter({
    className = "",
    variant = "compact",
    showSince = true
}: IceMeltCounterProps) {
    const [secondsOnPage, setSecondsOnPage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Start counting after a brief delay for dramatic effect
        const visibilityTimer = setTimeout(() => setIsVisible(true), 1000);

        const interval = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            setSecondsOnPage(elapsed);
        }, 100);

        return () => {
            clearInterval(interval);
            clearTimeout(visibilityTimer);
        };
    }, []);

    const iceMelted = Math.floor(secondsOnPage * ICE_LOSS_TONNES_PER_SECOND);
    const olympicPools = Math.floor(secondsOnPage * OLYMPIC_POOLS_PER_SECOND);
    const timeOnPage = formatTime(secondsOnPage);

    const shareStats = () => {
        const text = `⚠️ While I was on the Greenland story website for ${timeOnPage}, ${iceMelted.toLocaleString()} tonnes of Greenland ice melted.\n\nThat's ${olympicPools.toLocaleString()} Olympic swimming pools of water.\n\nLearn more:`;

        if (navigator.share) {
            navigator.share({
                title: "Greenland Ice Loss - Real-time",
                text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text + " " + window.location.href);
            alert("Copied to clipboard!");
        }
    };

    if (!isVisible) return null;

    if (variant === "compact") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-urgent-red/20 border border-urgent-red/40 ${className}`}
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <Droplet className="w-4 h-4 text-urgent-red" />
                </motion.div>
                <span className="text-sm text-glacier-white">
                    <strong className="text-urgent-red">{iceMelted.toLocaleString()}</strong> tonnes melted since you arrived
                </span>
            </motion.div>
        );
    }

    if (variant === "hero") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-urgent-red/30 via-orange-600/20 to-deep-navy border border-urgent-red/40 p-6 ${className}`}
            >
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-info/10 to-transparent"
                        animate={{ y: [100, 0] }}
                        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                        style={{ height: "200%" }}
                    />
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                            >
                                <Droplet className="w-6 h-6 text-info" />
                            </motion.div>
                            <span className="text-sm font-medium text-glacier-white/80">LIVE ICE LOSS</span>
                        </div>
                        {showSince && (
                            <span className="text-xs text-glacier-white/50">
                                Since you arrived: {timeOnPage}
                            </span>
                        )}
                    </div>

                    {/* Main counter */}
                    <div className="text-center mb-4">
                        <motion.p
                            key={iceMelted}
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            className="text-5xl md:text-6xl font-bold text-glacier-white font-mono"
                        >
                            {iceMelted.toLocaleString()}
                        </motion.p>
                        <p className="text-lg text-glacier-white/80 mt-1">tonnes of ice melted</p>
                    </div>

                    {/* Comparisons */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-glacier-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold text-info">{olympicPools.toLocaleString()}</p>
                            <p className="text-xs text-glacier-white/60">Olympic pools</p>
                        </div>
                        <div className="bg-glacier-white/10 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold text-resource-gold">{Math.floor(iceMelted / 6).toLocaleString()}</p>
                            <p className="text-xs text-glacier-white/60">Elephants of weight</p>
                        </div>
                    </div>

                    {/* Share button */}
                    <button
                        onClick={shareStats}
                        className="w-full py-2 rounded-lg bg-urgent-red/30 hover:bg-urgent-red/40 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <Share2 className="w-4 h-4" />
                        Share this impact
                    </button>
                </div>
            </motion.div>
        );
    }

    // Full variant
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-r from-urgent-red/20 to-info/20 border border-urgent-red/30 rounded-2xl p-6 ${className}`}
        >
            <div className="flex items-start gap-4">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-urgent-red/30 flex items-center justify-center"
                >
                    <Droplet className="w-6 h-6 text-info" />
                </motion.div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold text-glacier-white mb-1">
                        Ice Melting Right Now
                    </h3>
                    <p className="text-glacier-white/70 text-sm mb-3">
                        In the <strong>{timeOnPage}</strong> you've been on this page:
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <div>
                            <p className="text-3xl font-bold text-urgent-red font-mono">
                                {iceMelted.toLocaleString()}
                            </p>
                            <p className="text-xs text-glacier-white/60">tonnes melted</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-info font-mono">
                                {olympicPools.toLocaleString()}
                            </p>
                            <p className="text-xs text-glacier-white/60">Olympic pools</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={shareStats}
                    className="flex-shrink-0 p-2 rounded-lg bg-glacier-white/10 hover:bg-glacier-white/20 transition-colors"
                    aria-label="Share"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            {/* Info tooltip */}
            <div className="mt-4 flex items-start gap-2 text-xs text-glacier-white/50">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>
                    Based on NASA/ESA satellite data showing Greenland loses ~267 billion tonnes of ice annually (~8,463 tonnes/second).
                </span>
            </div>
        </motion.div>
    );
}

function formatTime(seconds: number): string {
    if (seconds < 60) {
        return `${Math.floor(seconds)} seconds`;
    } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}m ${secs}s`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${mins}m`;
    }
}

// Floating sticky version for maximum virality
export function IceMeltSticky() {
    const [isMinimized, setIsMinimized] = useState(false);
    const [secondsOnPage, setSecondsOnPage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Show after 5 seconds
        const visibilityTimer = setTimeout(() => setIsVisible(true), 5000);

        const interval = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            setSecondsOnPage(elapsed);
        }, 100);

        return () => {
            clearInterval(interval);
            clearTimeout(visibilityTimer);
        };
    }, []);

    const iceMelted = Math.floor(secondsOnPage * ICE_LOSS_TONNES_PER_SECOND);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="fixed bottom-24 right-4 z-40"
            >
                {isMinimized ? (
                    <button
                        onClick={() => setIsMinimized(false)}
                        className="w-14 h-14 rounded-full bg-urgent-red/90 backdrop-blur shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            <Droplet className="w-6 h-6 text-white" />
                        </motion.div>
                    </button>
                ) : (
                    <div className="bg-deep-navy/95 backdrop-blur border border-urgent-red/40 rounded-2xl p-4 shadow-xl max-w-xs">
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="absolute top-2 right-2 text-glacier-white/50 hover:text-glacier-white"
                        >
                            ×
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <Droplet className="w-5 h-5 text-info" />
                            </motion.div>
                            <span className="text-xs text-glacier-white/60">While you're here</span>
                        </div>
                        <p className="text-2xl font-bold text-glacier-white font-mono">
                            {iceMelted.toLocaleString()}
                            <span className="text-sm font-normal text-glacier-white/60 ml-2">tonnes</span>
                        </p>
                        <p className="text-xs text-glacier-white/50 mt-1">
                            of Greenland ice has melted
                        </p>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
