"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Vote, Gamepad2, Building2, Brain } from "lucide-react";

interface GamePreview {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    emoji: string;
    duration: string;
    href: string;
    gradient: string;
    stats?: string;
}

const games: GamePreview[] = [
    {
        id: "vote",
        title: "YOU DECIDE",
        subtitle: "Greenland's Future",
        description: "Navigate a 5-round decision tree and discover your vision for 2050. See how your choices compare to thousands of other players.",
        icon: <Vote className="w-10 h-10" />,
        emoji: "🗳️",
        duration: "5-7 min",
        href: "/games/vote",
        gradient: "gradient-game-vote",
        stats: "34% chose same path",
    },
    {
        id: "strategy",
        title: "ARCTIC STRATEGY",
        subtitle: "Govern for 10 Years",
        description: "Balance economy, environment, and geopolitics as Greenland's leader. Every decision has consequences.",
        icon: <Gamepad2 className="w-10 h-10" />,
        emoji: "🎮",
        duration: "3-4 min",
        href: "/games/strategy",
        gradient: "gradient-game-strategy",
    },
    {
        id: "build",
        title: "BUILD YOUR GREENLAND",
        subtitle: "Design Your Vision",
        description: "Place mines, parks, cities, and bases on an interactive map. Create your ideal balance and share with the community.",
        icon: <Building2 className="w-10 h-10" />,
        emoji: "🏗️",
        duration: "5-8 min",
        href: "/games/build",
        gradient: "gradient-game-build",
        stats: "View Top Creations",
    },
    {
        id: "trivia",
        title: "TRIVIA CHALLENGE",
        subtitle: "Test Your Knowledge",
        description: "10 questions on Greenland's history, geography, politics, and climate. Can you beat the high score?",
        icon: <Brain className="w-10 h-10" />,
        emoji: "🧠",
        duration: "2-3 min",
        href: "/games/trivia",
        gradient: "gradient-game-trivia",
        stats: "High Score: 920",
    },
];

export function GamesTeaser() {
    return (
        <section className="min-h-[80vh] py-24 px-6 bg-light-bg">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-section-heading text-dark-slate font-heading mb-4">
                        Don&apos;t Just Read — Decide
                    </h2>
                    <p className="text-body-large text-cool-gray max-w-2xl mx-auto">
                        Interactive games where YOU shape Greenland&apos;s future
                    </p>
                </motion.div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={game.href}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -8 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${game.gradient} rounded-3xl p-8 h-full min-h-[360px] flex flex-col cursor-pointer shadow-lg hover:shadow-2xl transition-shadow`}
                                >
                                    {/* Icon/Emoji */}
                                    <motion.span
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        className="text-5xl mb-6"
                                    >
                                        {game.emoji}
                                    </motion.span>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-glacier-white font-heading">
                                        {game.title}:
                                    </h3>
                                    <p className="text-lg text-glacier-white/90 mb-4">
                                        {game.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-glacier-white/80 flex-1 line-clamp-3">
                                        {game.description}
                                    </p>

                                    {/* Meta info */}
                                    <div className="flex items-center gap-4 text-sm text-glacier-white/70 mt-6">
                                        <span className="flex items-center gap-1">
                                            ⏱️ {game.duration}
                                        </span>
                                        {game.stats && (
                                            <span className="flex items-center gap-1">
                                                🏆 {game.stats}
                                            </span>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <button className="mt-6 w-full py-4 rounded-xl bg-glacier-white text-dark-slate font-bold hover:bg-arctic-ice transition-colors flex items-center justify-center gap-2 group">
                                        Play Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View all games CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/games"
                        className="btn btn-secondary btn-lg"
                    >
                        View All Games
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
