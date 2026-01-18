"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Share2,
    RotateCcw,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Leaf,
    DollarSign,
    Flag,
    Users,
    Crown,
    AlertTriangle,
    CheckCircle2,
    Play,
} from "lucide-react";

// Types
interface GameState {
    year: number;
    turn: number;
    budget: number;
    stats: {
        economy: number;
        environment: number;
        sovereignty: number;
        happiness: number;
    };
    events: GameEvent[];
    policies: Policy[];
    achievements: string[];
}

interface Policy {
    id: string;
    name: string;
    description: string;
    cost: number;
    icon: string;
    effects: {
        economy: number;
        environment: number;
        sovereignty: number;
        happiness: number;
        budget: number;
    };
    category: "economy" | "environment" | "politics" | "social";
    enacted: boolean;
}

interface GameEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    type: "positive" | "negative" | "neutral";
}

interface Decision {
    id: string;
    title: string;
    description: string;
    context: string;
    options: DecisionOption[];
}

interface DecisionOption {
    id: string;
    text: string;
    description: string;
    emoji: string;
    effects: {
        economy: number;
        environment: number;
        sovereignty: number;
        happiness: number;
        budget: number;
    };
}

// Available policies
const availablePolicies: Policy[] = [
    {
        id: "mining-permit",
        name: "Issue Mining Permits",
        description: "Allow foreign companies to extract rare earth minerals",
        cost: 50,
        icon: "⛏️",
        effects: { economy: 15, environment: -20, sovereignty: -10, happiness: -5, budget: 200 },
        category: "economy",
        enacted: false,
    },
    {
        id: "green-energy",
        name: "Green Energy Initiative",
        description: "Invest in hydroelectric and wind power infrastructure",
        cost: 150,
        icon: "🌿",
        effects: { economy: 5, environment: 20, sovereignty: 5, happiness: 10, budget: -150 },
        category: "environment",
        enacted: false,
    },
    {
        id: "tourism-expansion",
        name: "Eco-Tourism Program",
        description: "Develop sustainable tourism infrastructure",
        cost: 100,
        icon: "🏔️",
        effects: { economy: 10, environment: -5, sovereignty: 5, happiness: 15, budget: 50 },
        category: "economy",
        enacted: false,
    },
    {
        id: "cultural-preservation",
        name: "Cultural Preservation Act",
        description: "Fund Inuit language and tradition programs",
        cost: 80,
        icon: "🎭",
        effects: { economy: -5, environment: 5, sovereignty: 15, happiness: 20, budget: -80 },
        category: "social",
        enacted: false,
    },
    {
        id: "us-base-expansion",
        name: "US Base Expansion Deal",
        description: "Allow expanded military presence for $500M",
        cost: 0,
        icon: "🛡️",
        effects: { economy: 10, environment: -10, sovereignty: -25, happiness: -10, budget: 500 },
        category: "politics",
        enacted: false,
    },
    {
        id: "marine-protection",
        name: "Marine Protected Areas",
        description: "Ban commercial fishing in sensitive zones",
        cost: 60,
        icon: "🐋",
        effects: { economy: -10, environment: 25, sovereignty: 10, happiness: 5, budget: -60 },
        category: "environment",
        enacted: false,
    },
    {
        id: "education-reform",
        name: "Education Modernization",
        description: "Improve schools and create university programs",
        cost: 120,
        icon: "📚",
        effects: { economy: 5, environment: 0, sovereignty: 10, happiness: 20, budget: -120 },
        category: "social",
        enacted: false,
    },
    {
        id: "independence-prep",
        name: "Independence Preparation",
        description: "Build institutions for potential independence",
        cost: 200,
        icon: "🇬🇱",
        effects: { economy: -10, environment: 0, sovereignty: 30, happiness: 15, budget: -200 },
        category: "politics",
        enacted: false,
    },
];

// Random events that can occur
const randomEvents: Decision[] = [
    {
        id: "ice-melt-crisis",
        title: "Unprecedented Ice Melt",
        description: "Scientists report record ice loss this summer. The world is watching.",
        context: "Global media coverage has increased attention on Greenland's climate situation.",
        options: [
            {
                id: "climate-summit",
                text: "Host Climate Summit",
                description: "Invite world leaders to witness the crisis firsthand",
                emoji: "🌍",
                effects: { economy: -20, environment: 15, sovereignty: 20, happiness: 10, budget: -100 },
            },
            {
                id: "research-funding",
                text: "Fund Climate Research",
                description: "Partner with international scientists",
                emoji: "🔬",
                effects: { economy: 5, environment: 10, sovereignty: 5, happiness: 5, budget: -50 },
            },
            {
                id: "ignore",
                text: "Focus on Economy",
                description: "Prioritize development over climate messaging",
                emoji: "💰",
                effects: { economy: 15, environment: -15, sovereignty: -5, happiness: -5, budget: 50 },
            },
        ],
    },
    {
        id: "trump-offer",
        title: "US Purchase Offer",
        description: "The US president has publicly offered to buy Greenland for $50 billion.",
        context: "Denmark has called the offer 'absurd' but the pressure is mounting.",
        options: [
            {
                id: "reject-strongly",
                text: "Strong Rejection",
                description: "'Greenland is not for sale' - make a public statement",
                emoji: "✊",
                effects: { economy: -10, environment: 0, sovereignty: 30, happiness: 25, budget: 0 },
            },
            {
                id: "negotiate",
                text: "Open Dialogue",
                description: "Use the attention to negotiate better terms for future cooperation",
                emoji: "🤝",
                effects: { economy: 20, environment: 0, sovereignty: -5, happiness: 0, budget: 100 },
            },
            {
                id: "silence",
                text: "Let Denmark Respond",
                description: "Stay quiet and let the diplomatic process unfold",
                emoji: "🤐",
                effects: { economy: 0, environment: 0, sovereignty: -10, happiness: -10, budget: 0 },
            },
        ],
    },
    {
        id: "rare-earth-discovery",
        title: "Major Mineral Discovery",
        description: "A massive rare earth deposit has been found in southern Greenland.",
        context: "China, US, and EU are all interested in mining rights.",
        options: [
            {
                id: "auction",
                text: "International Auction",
                description: "Let companies bid for extraction rights",
                emoji: "🏛️",
                effects: { economy: 30, environment: -25, sovereignty: -10, happiness: -10, budget: 300 },
            },
            {
                id: "state-mining",
                text: "State-Owned Mining",
                description: "Create national mining company (expensive but sovereign)",
                emoji: "🏗️",
                effects: { economy: 10, environment: -15, sovereignty: 20, happiness: 10, budget: -200 },
            },
            {
                id: "protect",
                text: "Protect the Site",
                description: "Designate as protected natural area",
                emoji: "🌳",
                effects: { economy: -15, environment: 30, sovereignty: 10, happiness: 15, budget: -50 },
            },
        ],
    },
    {
        id: "cruise-boom",
        title: "Cruise Ship Boom",
        description: "Cruise companies want to dramatically increase Greenland routes.",
        context: "Up to 100,000 tourists could visit annually. Local infrastructure is limited.",
        options: [
            {
                id: "welcome-all",
                text: "Welcome All Ships",
                description: "Maximize tourism revenue without restrictions",
                emoji: "🚢",
                effects: { economy: 25, environment: -20, sovereignty: 0, happiness: -5, budget: 150 },
            },
            {
                id: "sustainable-cap",
                text: "Sustainable Cap",
                description: "Limit to 50,000 tourists with strict environmental rules",
                emoji: "♻️",
                effects: { economy: 10, environment: 5, sovereignty: 10, happiness: 15, budget: 50 },
            },
            {
                id: "ban-large",
                text: "Ban Large Ships",
                description: "Only allow small expedition vessels",
                emoji: "⛵",
                effects: { economy: -5, environment: 20, sovereignty: 15, happiness: 10, budget: -20 },
            },
        ],
    },
    {
        id: "denmark-subsidy",
        title: "Danish Subsidy Review",
        description: "Denmark is reviewing the annual $500M subsidy arrangement.",
        context: "They're suggesting linking subsidies to policy alignment.",
        options: [
            {
                id: "accept-terms",
                text: "Accept Conditions",
                description: "Agree to some policy coordination for full subsidy",
                emoji: "📝",
                effects: { economy: 5, environment: 0, sovereignty: -20, happiness: -10, budget: 150 },
            },
            {
                id: "negotiate-freedom",
                text: "Negotiate Independence",
                description: "Push for unconditional support",
                emoji: "⚖️",
                effects: { economy: 0, environment: 0, sovereignty: 10, happiness: 5, budget: 50 },
            },
            {
                id: "reject-subsidy",
                text: "Reject Subsidy",
                description: "Declare you'll fund independence yourself",
                emoji: "🚀",
                effects: { economy: -20, environment: 0, sovereignty: 35, happiness: 5, budget: -200 },
            },
        ],
    },
];

const TOTAL_TURNS = 10;
const START_YEAR = 2025;

export default function StrategyGame() {
    const [gamePhase, setGamePhase] = useState<"intro" | "playing" | "event" | "result">("intro");
    const [gameState, setGameState] = useState<GameState>({
        year: START_YEAR,
        turn: 1,
        budget: 500,
        stats: {
            economy: 50,
            environment: 75,
            sovereignty: 40,
            happiness: 60,
        },
        events: [],
        policies: [...availablePolicies],
        achievements: [],
    });
    const [currentEvent, setCurrentEvent] = useState<Decision | null>(null);
    const [showPolicyDetails, setShowPolicyDetails] = useState<string | null>(null);

    const startGame = () => {
        setGameState({
            year: START_YEAR,
            turn: 1,
            budget: 500,
            stats: {
                economy: 50,
                environment: 75,
                sovereignty: 40,
                happiness: 60,
            },
            events: [],
            policies: availablePolicies.map((p) => ({ ...p, enacted: false })),
            achievements: [],
        });
        setGamePhase("playing");
    };

    const enactPolicy = (policyId: string) => {
        const policy = gameState.policies.find((p) => p.id === policyId);
        if (!policy || policy.enacted || gameState.budget < policy.cost) return;

        setGameState((prev) => ({
            ...prev,
            budget: prev.budget - policy.cost + policy.effects.budget,
            stats: {
                economy: Math.max(0, Math.min(100, prev.stats.economy + policy.effects.economy)),
                environment: Math.max(0, Math.min(100, prev.stats.environment + policy.effects.environment)),
                sovereignty: Math.max(0, Math.min(100, prev.stats.sovereignty + policy.effects.sovereignty)),
                happiness: Math.max(0, Math.min(100, prev.stats.happiness + policy.effects.happiness)),
            },
            policies: prev.policies.map((p) =>
                p.id === policyId ? { ...p, enacted: true } : p
            ),
        }));
    };

    const endTurn = useCallback(() => {
        // Random event chance (60%)
        if (Math.random() < 0.6) {
            const availableEvents = randomEvents.filter(
                (e) => !gameState.events.some((ge) => ge.id === e.id)
            );
            if (availableEvents.length > 0) {
                const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
                setCurrentEvent(event);
                setGamePhase("event");
                return;
            }
        }
        progressTurn();
    }, [gameState.events]);

    const handleEventChoice = (option: DecisionOption) => {
        setGameState((prev) => ({
            ...prev,
            budget: Math.max(0, prev.budget + option.effects.budget),
            stats: {
                economy: Math.max(0, Math.min(100, prev.stats.economy + option.effects.economy)),
                environment: Math.max(0, Math.min(100, prev.stats.environment + option.effects.environment)),
                sovereignty: Math.max(0, Math.min(100, prev.stats.sovereignty + option.effects.sovereignty)),
                happiness: Math.max(0, Math.min(100, prev.stats.happiness + option.effects.happiness)),
            },
            events: currentEvent
                ? [
                    ...prev.events,
                    {
                        id: currentEvent.id,
                        year: prev.year,
                        title: currentEvent.title,
                        description: `You chose: ${option.text}`,
                        type: option.effects.sovereignty > 0 ? "positive" : "neutral",
                    },
                ]
                : prev.events,
        }));
        setCurrentEvent(null);
        progressTurn();
    };

    const progressTurn = () => {
        if (gameState.turn >= TOTAL_TURNS) {
            // Calculate achievements
            const achievements: string[] = [];
            if (gameState.stats.sovereignty >= 80) achievements.push("🇬🇱 Independence Ready");
            if (gameState.stats.environment >= 80) achievements.push("🌿 Climate Champion");
            if (gameState.stats.economy >= 80) achievements.push("💰 Economic Powerhouse");
            if (gameState.stats.happiness >= 80) achievements.push("😊 People's Champion");
            if (gameState.budget >= 1000) achievements.push("🏦 Wealthy Nation");
            if (gameState.policies.filter((p) => p.enacted).length >= 5) achievements.push("📋 Active Governance");

            setGameState((prev) => ({ ...prev, achievements }));
            setGamePhase("result");
        } else {
            // Natural changes per turn
            setGameState((prev) => ({
                ...prev,
                year: prev.year + 1,
                turn: prev.turn + 1,
                budget: prev.budget + 50 + Math.floor(prev.stats.economy / 10), // Base income + economy bonus
                stats: {
                    ...prev.stats,
                    environment: Math.max(0, Math.min(100, prev.stats.environment - 2)), // Slow environmental decline
                },
            }));
            setGamePhase("playing");
        }
    };

    const getGrade = () => {
        const total = gameState.stats.economy + gameState.stats.environment + gameState.stats.sovereignty + gameState.stats.happiness;
        const avg = total / 4;
        if (avg >= 75) return { grade: "A", title: "Excellent Leader", emoji: "👑" };
        if (avg >= 60) return { grade: "B", title: "Good Steward", emoji: "🏆" };
        if (avg >= 45) return { grade: "C", title: "Balanced Approach", emoji: "⚖️" };
        if (avg >= 30) return { grade: "D", title: "Struggling Leader", emoji: "😓" };
        return { grade: "F", title: "Failed State", emoji: "💔" };
    };

    const shareResult = () => {
        const grade = getGrade();
        const text = `🏛️ I governed Greenland in "Govern Greenland" strategy game!\n\n${grade.emoji} Grade: ${grade.grade} - ${grade.title}\n\n📊 Final Stats:\n💰 Economy: ${gameState.stats.economy}\n🌿 Environment: ${gameState.stats.environment}\n🇬🇱 Sovereignty: ${gameState.stats.sovereignty}\n😊 Happiness: ${gameState.stats.happiness}\n\nCan you do better?`;

        if (navigator.share) {
            navigator.share({ title: "Govern Greenland Results", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    };

    const StatBar = ({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) => (
        <div className="bg-glacier-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium">{label}</span>
                </div>
                <span className="text-sm font-bold">{value}</span>
            </div>
            <div className="h-2 bg-glacier-white/20 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-20 gradient-story text-glacier-white">
            <div className="section-container py-12 px-6">
                <AnimatePresence mode="wait">
                    {/* INTRO SCREEN */}
                    {gamePhase === "intro" && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-8xl block mb-8"
                            >
                                🏛️
                            </motion.span>

                            <h1 className="text-hero font-heading mb-6">Govern Greenland</h1>
                            <p className="text-2xl text-arctic-ice mb-4">Strategic Nation Builder</p>
                            <p className="text-body-large text-glacier-white/80 max-w-xl mx-auto mb-8">
                                Lead Greenland through 10 years of critical decisions. Balance economy, environment, sovereignty, and citizen happiness.
                            </p>

                            {/* Game mechanics */}
                            <div className="grid md:grid-cols-4 gap-4 mb-12">
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-resource-gold" />
                                    <p className="font-bold">Economy</p>
                                    <p className="text-xs text-glacier-white/60">Trade & resources</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Leaf className="w-8 h-8 mx-auto mb-2 text-success" />
                                    <p className="font-bold">Environment</p>
                                    <p className="text-xs text-glacier-white/60">Climate & nature</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Flag className="w-8 h-8 mx-auto mb-2 text-arctic-ice" />
                                    <p className="font-bold">Sovereignty</p>
                                    <p className="text-xs text-glacier-white/60">Independence</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Users className="w-8 h-8 mx-auto mb-2 text-urgent-red" />
                                    <p className="font-bold">Happiness</p>
                                    <p className="text-xs text-glacier-white/60">Citizens' wellbeing</p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-12 py-5 rounded-2xl bg-glacier-white text-deep-navy font-bold text-xl hover:bg-arctic-ice transition-colors"
                            >
                                <Play className="inline-block mr-2 w-6 h-6" />
                                Start Governing
                            </motion.button>

                            <p className="text-sm text-glacier-white/50 mt-6">⏱️ Takes 5-10 minutes</p>
                        </motion.div>
                    )}

                    {/* PLAYING SCREEN */}
                    {gamePhase === "playing" && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-5xl mx-auto"
                        >
                            {/* Top bar */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-glacier-white/60">Year {gameState.year}</p>
                                    <p className="text-2xl font-bold">Turn {gameState.turn} of {TOTAL_TURNS}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-resource-gold/20 px-4 py-2 rounded-xl">
                                        <p className="text-sm text-glacier-white/60">Treasury</p>
                                        <p className="text-xl font-bold text-resource-gold">${gameState.budget}M</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={endTurn}
                                        className="px-6 py-3 rounded-xl bg-glacier-white text-deep-navy font-bold"
                                    >
                                        End Turn →
                                    </motion.button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <StatBar
                                    label="Economy"
                                    value={gameState.stats.economy}
                                    icon={<DollarSign className="w-4 h-4 text-resource-gold" />}
                                    color="#FFD700"
                                />
                                <StatBar
                                    label="Environment"
                                    value={gameState.stats.environment}
                                    icon={<Leaf className="w-4 h-4 text-success" />}
                                    color="#22C55E"
                                />
                                <StatBar
                                    label="Sovereignty"
                                    value={gameState.stats.sovereignty}
                                    icon={<Flag className="w-4 h-4 text-arctic-ice" />}
                                    color="#87CEEB"
                                />
                                <StatBar
                                    label="Happiness"
                                    value={gameState.stats.happiness}
                                    icon={<Users className="w-4 h-4 text-urgent-red" />}
                                    color="#EF4444"
                                />
                            </div>

                            {/* Policy grid */}
                            <div className="bg-glacier-white/5 rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-4">Available Policies</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {gameState.policies.map((policy) => (
                                        <motion.div
                                            key={policy.id}
                                            className={`relative p-4 rounded-xl border-2 transition-all ${policy.enacted
                                                    ? "bg-success/20 border-success/50"
                                                    : gameState.budget < policy.cost
                                                        ? "bg-glacier-white/5 border-glacier-white/10 opacity-50"
                                                        : "bg-glacier-white/10 border-glacier-white/20 hover:border-glacier-white/50 cursor-pointer"
                                                }`}
                                            onClick={() => !policy.enacted && setShowPolicyDetails(policy.id === showPolicyDetails ? null : policy.id)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl">{policy.icon}</span>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-bold">{policy.name}</h3>
                                                        {policy.enacted ? (
                                                            <CheckCircle2 className="w-5 h-5 text-success" />
                                                        ) : (
                                                            <span className="text-sm text-resource-gold">${policy.cost}M</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-glacier-white/70">{policy.description}</p>

                                                    {/* Expanded details */}
                                                    <AnimatePresence>
                                                        {showPolicyDetails === policy.id && !policy.enacted && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="mt-3 pt-3 border-t border-glacier-white/20"
                                                            >
                                                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <DollarSign className="w-3 h-3" />
                                                                        <span className={policy.effects.economy >= 0 ? "text-success" : "text-urgent-red"}>
                                                                            {policy.effects.economy >= 0 ? "+" : ""}{policy.effects.economy}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Leaf className="w-3 h-3" />
                                                                        <span className={policy.effects.environment >= 0 ? "text-success" : "text-urgent-red"}>
                                                                            {policy.effects.environment >= 0 ? "+" : ""}{policy.effects.environment}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Flag className="w-3 h-3" />
                                                                        <span className={policy.effects.sovereignty >= 0 ? "text-success" : "text-urgent-red"}>
                                                                            {policy.effects.sovereignty >= 0 ? "+" : ""}{policy.effects.sovereignty}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Users className="w-3 h-3" />
                                                                        <span className={policy.effects.happiness >= 0 ? "text-success" : "text-urgent-red"}>
                                                                            {policy.effects.happiness >= 0 ? "+" : ""}{policy.effects.happiness}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        enactPolicy(policy.id);
                                                                        setShowPolicyDetails(null);
                                                                    }}
                                                                    disabled={gameState.budget < policy.cost}
                                                                    className="w-full py-2 rounded-lg bg-glacier-white text-deep-navy font-bold text-sm"
                                                                >
                                                                    Enact Policy
                                                                </motion.button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* EVENT SCREEN */}
                    {gamePhase === "event" && currentEvent && (
                        <motion.div
                            key="event"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-1 rounded-full bg-urgent-red/20 text-urgent-red text-sm font-bold mb-4">
                                    <AlertTriangle className="inline-block w-4 h-4 mr-1" />
                                    RANDOM EVENT
                                </span>
                                <h2 className="text-hero font-heading">{currentEvent.title}</h2>
                            </div>

                            <div className="bg-glacier-white/10 rounded-3xl p-8 mb-8">
                                <p className="text-lg mb-4">{currentEvent.description}</p>
                                <p className="text-sm text-glacier-white/60 p-4 bg-glacier-white/5 rounded-xl">
                                    ℹ️ {currentEvent.context}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-center text-glacier-white/60 mb-4">Choose your response:</p>
                                {currentEvent.options.map((option, idx) => (
                                    <motion.button
                                        key={option.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.01, x: 8 }}
                                        onClick={() => handleEventChoice(option)}
                                        className="w-full text-left p-6 rounded-2xl bg-glacier-white/10 hover:bg-glacier-white/20 border-2 border-glacier-white/20 hover:border-glacier-white/50 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{option.emoji}</span>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{option.text}</h3>
                                                <p className="text-glacier-white/70">{option.description}</p>
                                                <div className="flex gap-4 mt-2 text-xs">
                                                    {option.effects.economy !== 0 && (
                                                        <span className={option.effects.economy > 0 ? "text-success" : "text-urgent-red"}>
                                                            💰 {option.effects.economy > 0 ? "+" : ""}{option.effects.economy}
                                                        </span>
                                                    )}
                                                    {option.effects.environment !== 0 && (
                                                        <span className={option.effects.environment > 0 ? "text-success" : "text-urgent-red"}>
                                                            🌿 {option.effects.environment > 0 ? "+" : ""}{option.effects.environment}
                                                        </span>
                                                    )}
                                                    {option.effects.sovereignty !== 0 && (
                                                        <span className={option.effects.sovereignty > 0 ? "text-success" : "text-urgent-red"}>
                                                            🇬🇱 {option.effects.sovereignty > 0 ? "+" : ""}{option.effects.sovereignty}
                                                        </span>
                                                    )}
                                                    {option.effects.happiness !== 0 && (
                                                        <span className={option.effects.happiness > 0 ? "text-success" : "text-urgent-red"}>
                                                            😊 {option.effects.happiness > 0 ? "+" : ""}{option.effects.happiness}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {gamePhase === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-9xl mb-4"
                            >
                                {getGrade().emoji}
                            </motion.div>

                            <h1 className="text-hero font-heading mb-2">Year {gameState.year}</h1>
                            <p className="text-2xl text-arctic-ice mb-2">{getGrade().title}</p>
                            <p className="text-xl text-resource-gold mb-8">Grade: {getGrade().grade}</p>

                            {/* Final stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-glacier-white/10 rounded-2xl p-4">
                                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-resource-gold" />
                                    <p className="text-3xl font-bold">{gameState.stats.economy}</p>
                                    <p className="text-sm text-glacier-white/60">Economy</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-4">
                                    <Leaf className="w-8 h-8 mx-auto mb-2 text-success" />
                                    <p className="text-3xl font-bold">{gameState.stats.environment}</p>
                                    <p className="text-sm text-glacier-white/60">Environment</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-4">
                                    <Flag className="w-8 h-8 mx-auto mb-2 text-arctic-ice" />
                                    <p className="text-3xl font-bold">{gameState.stats.sovereignty}</p>
                                    <p className="text-sm text-glacier-white/60">Sovereignty</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-4">
                                    <Users className="w-8 h-8 mx-auto mb-2 text-urgent-red" />
                                    <p className="text-3xl font-bold">{gameState.stats.happiness}</p>
                                    <p className="text-sm text-glacier-white/60">Happiness</p>
                                </div>
                            </div>

                            {/* Treasury */}
                            <div className="bg-resource-gold/20 rounded-xl p-4 mb-8">
                                <p className="text-lg">
                                    Final Treasury: <strong className="text-resource-gold">${gameState.budget}M</strong>
                                </p>
                            </div>

                            {/* Achievements */}
                            {gameState.achievements.length > 0 && (
                                <div className="bg-glacier-white/10 rounded-xl p-6 mb-8">
                                    <h3 className="font-bold mb-3">Achievements Unlocked</h3>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {gameState.achievements.map((achievement, idx) => (
                                            <motion.span
                                                key={idx}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 + idx * 0.1 }}
                                                className="px-4 py-2 rounded-full bg-resource-gold/20 text-resource-gold"
                                            >
                                                {achievement}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Policies enacted */}
                            <div className="text-left bg-glacier-white/5 rounded-xl p-6 mb-8">
                                <h3 className="font-bold mb-3">Policies Enacted</h3>
                                <div className="flex flex-wrap gap-2">
                                    {gameState.policies
                                        .filter((p) => p.enacted)
                                        .map((policy) => (
                                            <span key={policy.id} className="px-3 py-1 rounded-full bg-success/20 text-success text-sm">
                                                {policy.icon} {policy.name}
                                            </span>
                                        ))}
                                    {gameState.policies.filter((p) => p.enacted).length === 0 && (
                                        <span className="text-glacier-white/50">No policies enacted</span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={shareResult}
                                    className="px-8 py-4 rounded-xl bg-glacier-white text-deep-navy font-bold flex items-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share Result
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="px-8 py-4 rounded-xl bg-glacier-white/10 border border-glacier-white/30 font-bold flex items-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Play Again
                                </motion.button>
                            </div>

                            <Link
                                href="/games"
                                className="inline-flex items-center gap-2 text-glacier-white/60 hover:text-glacier-white mt-8 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Games
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
