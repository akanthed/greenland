"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Vote,
    Gamepad2,
    Map,
    Brain,
    Clock,
    Users,
    Trophy,
    Zap,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const games = [
    {
        id: "vote",
        title: "You Decide",
        subtitle: "Greenland's Future",
        description:
            "Navigate 5 critical decisions that will shape Greenland by 2050. Your choices determine independence, economy, environment, and culture.",
        emoji: "🗳️",
        icon: Vote,
        duration: "5-7 min",
        difficulty: "Easy",
        players: "47,392",
        href: "/games/vote",
        gradient: "from-blue-500 via-blue-600 to-indigo-700",
        accentColor: "#3B82F6",
        features: ["5 Decision Rounds", "Multiple Endings", "Shareable Results"],
        featured: true,
    },
    {
        id: "trivia",
        title: "Trivia Challenge",
        subtitle: "Test Your Knowledge",
        description:
            "10 questions on Greenland's history, geography, politics, and climate. Race against the timer for bonus points!",
        emoji: "🧠",
        icon: Brain,
        duration: "2-3 min",
        difficulty: "Medium",
        players: "31,847",
        href: "/games/trivia",
        gradient: "from-amber-500 via-orange-500 to-red-600",
        accentColor: "#F59E0B",
        features: ["15-Second Timer", "Streak Bonuses", "5 Categories"],
        featured: false,
    },
    {
        id: "strategy",
        title: "Govern Greenland",
        subtitle: "Strategic Nation Builder",
        description:
            "Lead Greenland through 10 years of critical decisions. Balance economy, environment, sovereignty, and citizen happiness.",
        emoji: "🏛️",
        icon: Gamepad2,
        duration: "5-10 min",
        difficulty: "Hard",
        players: "18,293",
        href: "/games/strategy",
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
        accentColor: "#10B981",
        features: ["Policy Decisions", "Random Events", "Achievement System"],
        featured: false,
    },
    {
        id: "build",
        title: "Map Creator",
        subtitle: "Design Your Vision",
        description:
            "You have $1,000M to invest. Place developments on the map to create your vision for Greenland in 2050.",
        emoji: "🗺️",
        icon: Map,
        duration: "5-8 min",
        difficulty: "Medium",
        players: "12,541",
        href: "/games/build",
        gradient: "from-purple-600 via-violet-600 to-fuchsia-700",
        accentColor: "#9333EA",
        features: ["12 Building Types", "Interactive Map", "Custom Naming"],
        featured: false,
    },
];

const difficultyColors: Record<string, string> = {
    Easy: "bg-success/20 text-success",
    Medium: "bg-resource-gold/20 text-resource-gold",
    Hard: "bg-urgent-red/20 text-urgent-red",
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function GamesPage() {
    const featuredGame = games.find((g) => g.featured);
    const otherGames = games.filter((g) => !g.featured);

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-b from-deep-navy via-medium-navy to-deep-navy text-glacier-white">
            <div className="section-container py-16 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-purple/20 text-game-purple mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold">Interactive Experiences</span>
                    </motion.div>

                    <h1 className="text-hero font-heading mb-6">
                        Don&apos;t Just Read —{" "}
                        <span className="bg-gradient-to-r from-game-purple via-info to-success bg-clip-text text-transparent">
                            Decide
                        </span>
                    </h1>
                    <p className="text-body-large text-glacier-white/70 max-w-2xl mx-auto">
                        Shape Greenland&apos;s future through interactive games. Vote on critical decisions,
                        test your knowledge, govern the nation, or design your own vision.
                    </p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 mt-10"
                    >
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glacier-white/10 backdrop-blur">
                            <Users className="w-5 h-5 text-info" />
                            <div className="text-left">
                                <p className="text-xl font-bold">109,673</p>
                                <p className="text-xs text-glacier-white/60">Total Players</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glacier-white/10 backdrop-blur">
                            <Trophy className="w-5 h-5 text-resource-gold" />
                            <div className="text-left">
                                <p className="text-xl font-bold">47,392</p>
                                <p className="text-xs text-glacier-white/60">This Week</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glacier-white/10 backdrop-blur">
                            <Zap className="w-5 h-5 text-game-purple" />
                            <div className="text-left">
                                <p className="text-xl font-bold">4 Games</p>
                                <p className="text-xs text-glacier-white/60">Available</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Featured Game */}
                {featuredGame && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <Link href={featuredGame.href}>
                            <div
                                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${featuredGame.gradient} p-8 md:p-12 cursor-pointer group`}
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                                    <div className="absolute top-10 right-10 text-[200px] transform rotate-12">
                                        {featuredGame.emoji}
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    <motion.span
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="text-8xl"
                                    >
                                        {featuredGame.emoji}
                                    </motion.span>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-glacier-white/20 text-sm font-bold">
                                                🔥 FEATURED
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${difficultyColors[featuredGame.difficulty]}`}>
                                                {featuredGame.difficulty}
                                            </span>
                                        </div>

                                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-2">
                                            {featuredGame.title}
                                        </h2>
                                        <p className="text-xl text-glacier-white/90 mb-4">
                                            {featuredGame.subtitle}
                                        </p>
                                        <p className="text-glacier-white/80 max-w-xl mb-6">
                                            {featuredGame.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {featuredGame.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-3 py-1 rounded-full bg-glacier-white/10 text-sm"
                                                >
                                                    ✓ {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 rounded-xl bg-glacier-white text-deep-navy font-bold text-lg flex items-center gap-2 group-hover:shadow-xl transition-shadow"
                                            >
                                                Play Now
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                            <div className="flex items-center gap-2 text-glacier-white/70">
                                                <Clock className="w-4 h-4" />
                                                <span>{featuredGame.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-glacier-white/70">
                                                <Users className="w-4 h-4" />
                                                <span>{featuredGame.players} played</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Other Games Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {otherGames.map((game) => (
                        <motion.div key={game.id} variants={itemVariants}>
                            <Link href={game.href}>
                                <div
                                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.gradient} p-6 min-h-[360px] flex flex-col cursor-pointer group hover:shadow-2xl hover:scale-[1.02] transition-all`}
                                >
                                    {/* Background emoji */}
                                    <div className="absolute -bottom-4 -right-4 text-[100px] opacity-10 transform rotate-12">
                                        {game.emoji}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <motion.span
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                className="text-5xl"
                                            >
                                                {game.emoji}
                                            </motion.span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${difficultyColors[game.difficulty]}`}>
                                                {game.difficulty}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold font-heading mb-1">
                                            {game.title}
                                        </h3>
                                        <p className="text-glacier-white/80 text-sm mb-3">
                                            {game.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="text-glacier-white/70 text-sm flex-1 mb-4">
                                            {game.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {game.features.slice(0, 2).map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-2 py-1 rounded-full bg-glacier-white/10 text-xs"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-glacier-white/20">
                                            <div className="flex items-center gap-4 text-sm text-glacier-white/60">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {game.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {game.players}
                                                </span>
                                            </div>
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="flex items-center gap-1 font-bold text-sm"
                                            >
                                                Play <ArrowRight className="w-4 h-4" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-glacier-white/5 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">
                            🌍 Your Decisions Matter
                        </h3>
                        <p className="text-glacier-white/70 mb-6">
                            Every choice you make in these games reflects real debates happening in Greenland today.
                            Will you prioritize independence, economic growth, or environmental protection?
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/story">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-glacier-white/10 border border-glacier-white/20 font-bold hover:bg-glacier-white/20 transition-colors"
                                >
                                    📖 Read the Story First
                                </motion.button>
                            </Link>
                            <Link href="/polls">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-glacier-white/10 border border-glacier-white/20 font-bold hover:bg-glacier-white/20 transition-colors"
                                >
                                    📊 See Live Poll Results
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
