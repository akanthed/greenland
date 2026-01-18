"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check, Users } from "lucide-react";

interface ShareableResultProps {
    title: string;
    subtitle?: string;
    emoji: string;
    stats?: { label: string; value: string | number; color?: string }[];
    comparison?: { percentage: number; text: string };
    gameType: "vote" | "strategy" | "trivia" | "build";
    className?: string;
}

export function ShareableResult({
    title,
    subtitle,
    emoji,
    stats,
    comparison,
    gameType,
    className = "",
}: ShareableResultProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const gameLabels = {
        vote: "You Decide: Greenland's Future",
        strategy: "Govern Greenland",
        trivia: "Greenland Trivia Challenge",
        build: "Map Creator",
    };

    const gradients = {
        vote: "from-cyan-600 via-teal-600 to-emerald-700",
        strategy: "from-indigo-600 via-purple-600 to-pink-700",
        trivia: "from-amber-500 via-orange-500 to-red-600",
        build: "from-purple-600 via-violet-600 to-fuchsia-700",
    };

    const getShareText = () => {
        const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
        let text = `${emoji} I got "${title}" in ${gameLabels[gameType]}!\n\n`;

        if (comparison) {
            text += `Only ${comparison.percentage}% of players got this outcome! ${comparison.text}\n\n`;
        }

        if (stats && stats.length > 0) {
            text += "My stats:\n";
            stats.forEach(stat => {
                text += `${stat.label}: ${stat.value}\n`;
            });
        }

        text += `\nPlay now: ${baseUrl}/games/${gameType}`;
        return text;
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(getShareText());
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    };

    const shareToFacebook = () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(getShareText())}`, "_blank");
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(getShareText());
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const nativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${gameLabels[gameType]} Result`,
                    text: getShareText(),
                    url: typeof window !== "undefined" ? window.location.href : "",
                });
            } catch (error) {
                console.log("Share cancelled");
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Shareable Card */}
            <div
                ref={cardRef}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${gradients[gameType]}`}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                {/* Branding */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">🇬🇱</span>
                    <span className="text-glacier-white/80 text-sm font-medium">greenland-story.com</span>
                </div>

                {/* Content */}
                <div className="relative text-center pt-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-7xl mb-4"
                    >
                        {emoji}
                    </motion.div>

                    <h2 className="text-3xl font-heading text-glacier-white mb-2">{title}</h2>
                    {subtitle && (
                        <p className="text-glacier-white/80">{subtitle}</p>
                    )}

                    {/* Comparison stat with emphasis */}
                    {comparison && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-glacier-white/20 backdrop-blur"
                        >
                            <Users className="w-5 h-5 text-glacier-white" />
                            <span className="text-glacier-white font-bold">
                                Only <span className="text-2xl">{comparison.percentage}%</span> got this
                            </span>
                        </motion.div>
                    )}

                    {/* Stats grid */}
                    {stats && stats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="bg-glacier-white/10 rounded-xl p-3"
                                >
                                    <p className="text-2xl font-bold" style={{ color: stat.color || "#fff" }}>
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-glacier-white/70">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Game label */}
                    <p className="mt-6 text-glacier-white/60 text-sm">
                        {gameLabels[gameType]}
                    </p>
                </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nativeShare}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-glacier-white text-deep-navy font-bold"
                >
                    <Share2 className="w-5 h-5" />
                    Share Result
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-glacier-white/10 border border-glacier-white/30 font-bold"
                >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {isCopied ? "Copied!" : "Copy Text"}
                </motion.button>
            </div>

            {/* Extended share menu */}
            {showShareMenu && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center gap-3"
                >
                    <button
                        onClick={shareToTwitter}
                        className="p-3 rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-colors"
                        aria-label="Share to Twitter"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </button>
                    <button
                        onClick={shareToFacebook}
                        className="p-3 rounded-full bg-[#1877F2] hover:bg-[#166fe5] transition-colors"
                        aria-label="Share to Facebook"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="p-3 rounded-full bg-glacier-white/20 hover:bg-glacier-white/30 transition-colors"
                        aria-label="Copy to clipboard"
                    >
                        {isCopied ? (
                            <Check className="w-5 h-5 text-success" />
                        ) : (
                            <Copy className="w-5 h-5" />
                        )}
                    </button>
                </motion.div>
            )}
        </div>
    );
}

// Pre-built comparison component for "X% chose same as you"
// Note: Player counts are simulated for demo - would use real backend data in production
interface PlayerComparisonProps {
    yourChoice: string;
    percentage: number;
    totalPlayers?: number;
    className?: string;
}

export function PlayerComparison({ yourChoice, percentage, totalPlayers, className = "" }: PlayerComparisonProps) {
    // Simulated player count if not provided
    const displayTotal = totalPlayers ?? Math.floor(Math.random() * 20000) + 30000;
    const sameAsYou = Math.round((percentage / 100) * displayTotal);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-r from-info/20 to-success/20 border border-info/40 rounded-2xl p-6 ${className}`}
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <div className="relative w-20 h-20">
                        {/* Circular progress */}
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                            />
                            <motion.circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - percentage / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#10B981" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-glacier-white">{percentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="text-glacier-white font-medium">
                        <span className="text-xl font-bold text-success">{percentage}%</span> of players
                    </p>
                    <p className="text-glacier-white/80">
                        chose the same as you: <span className="font-semibold">{yourChoice}</span>
                    </p>
                    <p className="text-xs text-glacier-white/40 mt-1 italic">
                        (Demo mode - simulated stats)
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
