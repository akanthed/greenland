"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Share2, RotateCcw, ChevronRight, ArrowLeft, Trophy, Users } from "lucide-react";

// Types
interface Choice {
    id: string;
    text: string;
    description: string;
    emoji: string;
    impact: {
        sovereignty: number;
        economy: number;
        environment: number;
        culture: number;
    };
    nextRoundId: string;
}

interface Round {
    id: string;
    roundNumber: number;
    title: string;
    scenario: string;
    context: string;
    choices: Choice[];
    image?: string;
}

interface GameOutcome {
    id: string;
    title: string;
    description: string;
    emoji: string;
    detailedOutcome: string;
    stats: {
        sovereignty: number;
        economy: number;
        environment: number;
        culture: number;
    };
    globalPercentage: number; // Simulated percentage of players with same outcome
}

// Game Data - 5 Rounds of decisions
const rounds: Round[] = [
    {
        id: "round1",
        roundNumber: 1,
        title: "The Independence Question",
        scenario: "Greenland's parliament is voting on a historic referendum. As a citizen, you must decide: should Greenland pursue full independence from Denmark?",
        context: "Currently, Denmark provides $500 million annually in subsidies, controls foreign policy, and handles defense. Independence would mean full sovereignty but economic uncertainty.",
        choices: [
            {
                id: "independence",
                text: "Vote for Independence",
                description: "Full sovereignty, even with economic risk. Greenland's future belongs to Greenlandic people.",
                emoji: "🇬🇱",
                impact: { sovereignty: 30, economy: -20, environment: 0, culture: 20 },
                nextRoundId: "round2-independence",
            },
            {
                id: "status-quo",
                text: "Enhanced Autonomy",
                description: "Negotiate more powers while keeping Danish support. Gradual path to self-determination.",
                emoji: "🤝",
                impact: { sovereignty: 10, economy: 10, environment: 5, culture: 5 },
                nextRoundId: "round2-autonomy",
            },
            {
                id: "us-deal",
                text: "Consider US Partnership",
                description: "Explore closer ties with the United States for security and economic benefits.",
                emoji: "🇺🇸",
                impact: { sovereignty: -10, economy: 30, environment: -10, culture: -10 },
                nextRoundId: "round2-us",
            },
        ],
    },
    {
        id: "round2-independence",
        roundNumber: 2,
        title: "Funding Independence",
        scenario: "Your vote for independence passed! But now you must decide how to fund your new nation without Danish subsidies.",
        context: "The $500M annual subsidy is ending. You need new revenue sources.",
        choices: [
            {
                id: "mining",
                text: "Open to Mining",
                description: "Fast-track rare earth mining permits. Economic boom but environmental concerns.",
                emoji: "⛏️",
                impact: { sovereignty: 5, economy: 40, environment: -30, culture: -10 },
                nextRoundId: "round3-mining",
            },
            {
                id: "sustainable",
                text: "Green Economy",
                description: "Focus on sustainable tourism, fishing, and clean energy exports.",
                emoji: "🌿",
                impact: { sovereignty: 5, economy: 10, environment: 30, culture: 20 },
                nextRoundId: "round3-green",
            },
            {
                id: "mixed",
                text: "Balanced Approach",
                description: "Limited, regulated mining with strict environmental standards.",
                emoji: "⚖️",
                impact: { sovereignty: 5, economy: 20, environment: 0, culture: 5 },
                nextRoundId: "round3-balanced",
            },
        ],
    },
    {
        id: "round2-autonomy",
        roundNumber: 2,
        title: "Negotiating with Denmark",
        scenario: "Denmark has offered enhanced autonomy. What powers do you prioritize in negotiations?",
        context: "You can push for control over one major area. Each comes with tradeoffs.",
        choices: [
            {
                id: "resources",
                text: "Resource Rights",
                description: "Full control over mining and oil revenues. Denmark keeps defense.",
                emoji: "💎",
                impact: { sovereignty: 15, economy: 25, environment: -5, culture: 0 },
                nextRoundId: "round3-resources",
            },
            {
                id: "foreign-policy",
                text: "Foreign Affairs",
                description: "Greenland makes its own international deals. Denmark keeps financial support.",
                emoji: "🌐",
                impact: { sovereignty: 25, economy: 5, environment: 0, culture: 10 },
                nextRoundId: "round3-foreign",
            },
            {
                id: "cultural",
                text: "Cultural Autonomy",
                description: "Full control over education, language policy, and media. Preserve Inuit identity.",
                emoji: "🎭",
                impact: { sovereignty: 10, economy: 0, environment: 0, culture: 30 },
                nextRoundId: "round3-cultural",
            },
        ],
    },
    {
        id: "round2-us",
        roundNumber: 2,
        title: "The American Offer",
        scenario: "The US has made a formal proposal. What level of partnership do you accept?",
        context: "America offers significant investment but wants military access and resource rights.",
        choices: [
            {
                id: "territory",
                text: "Full Integration",
                description: "Become a US territory. Full investment, citizenship, but loss of sovereignty.",
                emoji: "🏛️",
                impact: { sovereignty: -50, economy: 50, environment: -20, culture: -30 },
                nextRoundId: "round3-territory",
            },
            {
                id: "bases",
                text: "Military Partnership",
                description: "Allow expanded bases in exchange for $20B investment package.",
                emoji: "🛡️",
                impact: { sovereignty: -20, economy: 35, environment: -15, culture: -5 },
                nextRoundId: "round3-bases",
            },
            {
                id: "trade",
                text: "Trade Deal Only",
                description: "Economic partnership without military expansion. More modest benefits.",
                emoji: "📦",
                impact: { sovereignty: 5, economy: 20, environment: 0, culture: 0 },
                nextRoundId: "round3-trade",
            },
        ],
    },
    // Round 3 variants
    {
        id: "round3-mining",
        roundNumber: 3,
        title: "The Mining Boom",
        scenario: "Chinese and Australian companies want to open mega-mines. How do you regulate them?",
        context: "Massive investment is pouring in, but locals worry about pollution and foreign control.",
        choices: [
            {
                id: "open",
                text: "Minimal Regulation",
                description: "Maximum investment, fastest growth. Accept some environmental damage.",
                emoji: "🏭",
                impact: { sovereignty: -10, economy: 30, environment: -40, culture: -15 },
                nextRoundId: "round4-common",
            },
            {
                id: "strict",
                text: "Strict Standards",
                description: "Enforce EU-level environmental rules. Slower growth but sustainable.",
                emoji: "📋",
                impact: { sovereignty: 10, economy: 15, environment: 10, culture: 5 },
                nextRoundId: "round4-common",
            },
            {
                id: "nationalize",
                text: "Nationalize Resources",
                description: "Create state mining company. Keep profits in Greenland.",
                emoji: "🏛️",
                impact: { sovereignty: 20, economy: 10, environment: 0, culture: 10 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-green",
        roundNumber: 3,
        title: "The Green Transition",
        scenario: "Your sustainable economy is growing slowly. An opportunity arises: host a major climate research center?",
        context: "It would bring scientists, funding, and prestige - but also more outsiders and development.",
        choices: [
            {
                id: "research-center",
                text: "Build the Center",
                description: "Become a global climate hub. More development but international recognition.",
                emoji: "🔬",
                impact: { sovereignty: 5, economy: 20, environment: 15, culture: -5 },
                nextRoundId: "round4-common",
            },
            {
                id: "preserve",
                text: "Limit Development",
                description: "Keep Greenland pristine. Slower economic growth but protected land.",
                emoji: "🏔️",
                impact: { sovereignty: 5, economy: -5, environment: 30, culture: 15 },
                nextRoundId: "round4-common",
            },
            {
                id: "tourism",
                text: "Eco-Tourism Focus",
                description: "Expand sustainable tourism. Balance economy with conservation.",
                emoji: "🚢",
                impact: { sovereignty: 5, economy: 15, environment: 5, culture: 10 },
                nextRoundId: "round4-common",
            },
        ],
    },
    // Generic rounds 3-5 for other paths
    {
        id: "round3-balanced",
        roundNumber: 3,
        title: "Managing Growth",
        scenario: "Your balanced approach is working. But now you must choose: expand carefully or consolidate?",
        context: "More investment opportunities are arriving. How fast should you grow?",
        choices: [
            {
                id: "expand",
                text: "Accelerate Growth",
                description: "Take more investment while maintaining standards.",
                emoji: "📈",
                impact: { sovereignty: 0, economy: 25, environment: -10, culture: -5 },
                nextRoundId: "round4-common",
            },
            {
                id: "consolidate",
                text: "Consolidate",
                description: "Focus on what's working. Slower but more stable.",
                emoji: "🏗️",
                impact: { sovereignty: 10, economy: 10, environment: 5, culture: 10 },
                nextRoundId: "round4-common",
            },
            {
                id: "pivot-green",
                text: "Pivot to Green",
                description: "Shift priority toward environmental protection.",
                emoji: "🌱",
                impact: { sovereignty: 5, economy: 5, environment: 20, culture: 10 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-resources",
        roundNumber: 3,
        title: "Resource Management",
        scenario: "You control your resources. A major oil deposit is discovered offshore. What do you do?",
        context: "Could fund independence completely, but Greenland banned oil exploration in 2021.",
        choices: [
            {
                id: "drill",
                text: "Lift the Ban",
                description: "Drill for oil. Economic bonanza but breaks climate commitment.",
                emoji: "🛢️",
                impact: { sovereignty: 10, economy: 40, environment: -50, culture: -10 },
                nextRoundId: "round4-common",
            },
            {
                id: "keep-ban",
                text: "Honor the Ban",
                description: "Maintain climate leadership. Find other revenue sources.",
                emoji: "🚫",
                impact: { sovereignty: 15, economy: -10, environment: 40, culture: 15 },
                nextRoundId: "round4-common",
            },
            {
                id: "sell-rights",
                text: "Sell Future Rights",
                description: "Auction rights but delay extraction 20 years. Get money now, decide later.",
                emoji: "📜",
                impact: { sovereignty: -5, economy: 25, environment: -10, culture: 0 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-foreign",
        roundNumber: 3,
        title: "First Foreign Deal",
        scenario: "You're making your first major international agreement. Who do you partner with?",
        context: "Your choice will shape Greenland's geopolitical position for decades.",
        choices: [
            {
                id: "nordic",
                text: "Nordic Alliance",
                description: "Strengthen ties with Iceland, Norway, Finland. Smaller but aligned values.",
                emoji: "🇳🇴",
                impact: { sovereignty: 10, economy: 15, environment: 15, culture: 15 },
                nextRoundId: "round4-common",
            },
            {
                id: "eu",
                text: "Rejoin EU",
                description: "Apply for EU membership. Access to massive market but regulations.",
                emoji: "🇪🇺",
                impact: { sovereignty: -5, economy: 25, environment: 20, culture: 0 },
                nextRoundId: "round4-common",
            },
            {
                id: "non-aligned",
                text: "Stay Non-Aligned",
                description: "Deal separately with everyone. Maximum flexibility but less leverage.",
                emoji: "🌍",
                impact: { sovereignty: 20, economy: 10, environment: 5, culture: 10 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-cultural",
        roundNumber: 3,
        title: "Language Policy",
        scenario: "You control education. A heated debate: require Greenlandic-only instruction?",
        context: "Danish is needed for higher education abroad, but Greenlandic is at risk of decline.",
        choices: [
            {
                id: "greenlandic",
                text: "Greenlandic First",
                description: "Make Greenlandic the primary language. Danish as elective.",
                emoji: "📚",
                impact: { sovereignty: 10, economy: -5, environment: 0, culture: 40 },
                nextRoundId: "round4-common",
            },
            {
                id: "bilingual",
                text: "True Bilingualism",
                description: "Equal status for both languages. More inclusive but dilutes identity.",
                emoji: "🔤",
                impact: { sovereignty: 5, economy: 5, environment: 0, culture: 15 },
                nextRoundId: "round4-common",
            },
            {
                id: "trilingual",
                text: "Add English",
                description: "Trilingual system with English. Opens global opportunities.",
                emoji: "🌐",
                impact: { sovereignty: 0, economy: 15, environment: 0, culture: 5 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-territory",
        roundNumber: 3,
        title: "Statehood Terms",
        scenario: "Congress is debating Greenland's status. What do you push for?",
        context: "You've chosen US integration. Now negotiate the terms.",
        choices: [
            {
                id: "state",
                text: "51st State",
                description: "Full statehood with voting rights and representation.",
                emoji: "⭐",
                impact: { sovereignty: -20, economy: 30, environment: -10, culture: -20 },
                nextRoundId: "round4-common",
            },
            {
                id: "territory",
                text: "Territory Status",
                description: "Like Puerto Rico. Fewer rights but more autonomy on local issues.",
                emoji: "🏝️",
                impact: { sovereignty: -10, economy: 20, environment: -5, culture: -10 },
                nextRoundId: "round4-common",
            },
            {
                id: "reverse",
                text: "Back Out",
                description: "Reconsider and pursue independence instead.",
                emoji: "↩️",
                impact: { sovereignty: 30, economy: -20, environment: 10, culture: 20 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-bases",
        roundNumber: 3,
        title: "Base Expansion",
        scenario: "The US wants three new military installations. Where do you allow them?",
        context: "More bases mean more money but more foreign presence.",
        choices: [
            {
                id: "all-bases",
                text: "Allow All Three",
                description: "Maximum investment. Greenland becomes major NATO hub.",
                emoji: "🏛️",
                impact: { sovereignty: -20, economy: 35, environment: -20, culture: -15 },
                nextRoundId: "round4-common",
            },
            {
                id: "limit-one",
                text: "One New Base",
                description: "Limit expansion to Thule area only. Moderate approach.",
                emoji: "1️⃣",
                impact: { sovereignty: -5, economy: 15, environment: -5, culture: -5 },
                nextRoundId: "round4-common",
            },
            {
                id: "research-only",
                text: "Research Only",
                description: "Allow scientific facilities, not military. Less money but better image.",
                emoji: "🔬",
                impact: { sovereignty: 5, economy: 10, environment: 5, culture: 5 },
                nextRoundId: "round4-common",
            },
        ],
    },
    {
        id: "round3-trade",
        roundNumber: 3,
        title: "Trade Partners",
        scenario: "Your trade deal with the US is successful. Now others want deals too. Prioritize?",
        context: "You can only negotiate one major deal this year.",
        choices: [
            {
                id: "china",
                text: "China Deal",
                description: "Massive rare earth demand. Best prices but geopolitical risk.",
                emoji: "🇨🇳",
                impact: { sovereignty: -10, economy: 30, environment: -15, culture: -10 },
                nextRoundId: "round4-common",
            },
            {
                id: "eu-deal",
                text: "EU Green Deal",
                description: "European market access. Strict environmental standards required.",
                emoji: "🇪🇺",
                impact: { sovereignty: 0, economy: 20, environment: 20, culture: 5 },
                nextRoundId: "round4-common",
            },
            {
                id: "no-more",
                text: "Pause Expansion",
                description: "Focus on implementing current US deal first.",
                emoji: "⏸️",
                impact: { sovereignty: 10, economy: 5, environment: 5, culture: 5 },
                nextRoundId: "round4-common",
            },
        ],
    },
    // Round 4 - Common continuation
    {
        id: "round4-common",
        roundNumber: 4,
        title: "Climate Crisis Decision",
        scenario: "A major climate event hits: unprecedented ice melt opens a new shipping channel. Global powers are interested.",
        context: "This could be worth billions - but at what cost?",
        choices: [
            {
                id: "monetize",
                text: "Monetize the Passage",
                description: "Charge shipping fees. Accept climate reality and profit from it.",
                emoji: "🚢",
                impact: { sovereignty: 5, economy: 30, environment: -20, culture: -10 },
                nextRoundId: "round5",
            },
            {
                id: "protect",
                text: "Create Protected Zone",
                description: "Declare the area a marine sanctuary. Gain environmental credibility.",
                emoji: "🐋",
                impact: { sovereignty: 10, economy: -10, environment: 35, culture: 15 },
                nextRoundId: "round5",
            },
            {
                id: "international",
                text: "International Management",
                description: "Propose UN oversight with Greenland as lead partner.",
                emoji: "🇺🇳",
                impact: { sovereignty: 5, economy: 15, environment: 15, culture: 10 },
                nextRoundId: "round5",
            },
        ],
    },
    // Round 5 - Final decision
    {
        id: "round5",
        roundNumber: 5,
        title: "The 2050 Vision",
        scenario: "It's time to define Greenland's long-term future. What should the nation prioritize for the next generation?",
        context: "Your final choice will determine the legacy of this era.",
        choices: [
            {
                id: "prosperity",
                text: "Economic Prosperity",
                description: "Maximize growth and living standards. Become an Arctic Singapore.",
                emoji: "💎",
                impact: { sovereignty: 0, economy: 30, environment: -15, culture: -10 },
                nextRoundId: "end",
            },
            {
                id: "preservation",
                text: "Cultural Preservation",
                description: "Protect Inuit heritage above all. Limit outside influence.",
                emoji: "🎭",
                impact: { sovereignty: 15, economy: -5, environment: 10, culture: 35 },
                nextRoundId: "end",
            },
            {
                id: "balance",
                text: "Sustainable Balance",
                description: "Find the middle path. Some trade-offs for a livable future.",
                emoji: "⚖️",
                impact: { sovereignty: 10, economy: 10, environment: 15, culture: 15 },
                nextRoundId: "end",
            },
            {
                id: "climate-leader",
                text: "Climate Leadership",
                description: "Become the world's example of climate adaptation and protection.",
                emoji: "🌍",
                impact: { sovereignty: 10, economy: 5, environment: 40, culture: 10 },
                nextRoundId: "end",
            },
        ],
    },
];

// Generate outcome based on total stats
function calculateOutcome(stats: { sovereignty: number; economy: number; environment: number; culture: number }): GameOutcome {
    const { sovereignty, economy, environment, culture } = stats;
    const total = sovereignty + economy + environment + culture;

    // Determine primary focus
    const max = Math.max(sovereignty, economy, environment, culture);

    if (sovereignty === max && sovereignty > 60) {
        return {
            id: "independent-nation",
            title: "The Independent Nation",
            description: "You charted a fiercely independent path. Greenland stands alone.",
            emoji: "🇬🇱",
            detailedOutcome: "By 2050, Greenland is a fully sovereign nation with its own foreign policy, military, and international presence. Economic growth was slower, but Greenlanders control their own destiny. The world watches as this small Arctic nation proves self-determination is possible.",
            stats,
            globalPercentage: 18,
        };
    } else if (economy === max && economy > 60) {
        return {
            id: "arctic-singapore",
            title: "The Arctic Singapore",
            description: "You prioritized growth. Greenland is now a wealthy Arctic hub.",
            emoji: "💰",
            detailedOutcome: "By 2050, Greenland has one of the highest GDPs per capita in the world. Mining, shipping, and finance have transformed Nuuk into a gleaming Arctic metropolis. But traditionalists mourn the loss of the old ways, and environmental damage is significant.",
            stats,
            globalPercentage: 24,
        };
    } else if (environment === max && environment > 60) {
        return {
            id: "climate-sanctuary",
            title: "The Climate Sanctuary",
            description: "You protected the ice. Greenland became a global example.",
            emoji: "🌿",
            detailedOutcome: "By 2050, Greenland is the world's foremost example of climate leadership. Vast areas are protected, carbon capture is a major industry, and scientists from around the world study the Arctic here. Economy is modest but sustainable.",
            stats,
            globalPercentage: 15,
        };
    } else if (culture === max && culture > 60) {
        return {
            id: "preserved-heritage",
            title: "The Preserved Heritage",
            description: "You kept Inuit culture alive. Greenland's soul is intact.",
            emoji: "🎭",
            detailedOutcome: "By 2050, Greenlandic language and traditions are thriving. The world comes to learn from indigenous wisdom. Development is limited, but Greenlanders live according to their ancestors' values. A rare success story of cultural preservation.",
            stats,
            globalPercentage: 12,
        };
    } else if (sovereignty < 0) {
        return {
            id: "american-greenland",
            title: "American Greenland",
            description: "You chose the US path. Greenland is now American territory.",
            emoji: "🇺🇸",
            detailedOutcome: "By 2050, Greenland is a US territory with significant autonomy. American investment transformed infrastructure, but Greenlandic identity has fundamentally changed. It's prosperous but no longer truly independent.",
            stats,
            globalPercentage: 8,
        };
    } else {
        return {
            id: "balanced-future",
            title: "The Balanced Future",
            description: "You found the middle path. Greenland evolved carefully.",
            emoji: "⚖️",
            detailedOutcome: "By 2050, Greenland has maintained its unique position - autonomous but connected, developed but sustainable, modern but rooted. It's not the richest or purest outcome, but it may be the wisest. Greenland endures.",
            stats,
            globalPercentage: 23,
        };
    }
}

export default function VotingGame() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
    const [currentRoundId, setCurrentRoundId] = useState("round1");
    const [choiceHistory, setChoiceHistory] = useState<Array<{ round: Round; choice: Choice }>>([]);
    const [stats, setStats] = useState({
        sovereignty: 50,
        economy: 50,
        environment: 50,
        culture: 50,
    });
    const [outcome, setOutcome] = useState<GameOutcome | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentRound = rounds.find((r) => r.id === currentRoundId);

    const handleChoice = (choice: Choice) => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Update stats
        const newStats = {
            sovereignty: Math.max(0, Math.min(100, stats.sovereignty + choice.impact.sovereignty)),
            economy: Math.max(0, Math.min(100, stats.economy + choice.impact.economy)),
            environment: Math.max(0, Math.min(100, stats.environment + choice.impact.environment)),
            culture: Math.max(0, Math.min(100, stats.culture + choice.impact.culture)),
        };
        setStats(newStats);

        // Add to history
        if (currentRound) {
            setChoiceHistory([...choiceHistory, { round: currentRound, choice }]);
        }

        // Animate and transition
        setTimeout(() => {
            if (choice.nextRoundId === "end") {
                setOutcome(calculateOutcome(newStats));
                setGameState("result");
            } else {
                setCurrentRoundId(choice.nextRoundId);
            }
            setIsAnimating(false);
        }, 800);
    };

    const startGame = () => {
        setGameState("playing");
        setCurrentRoundId("round1");
        setChoiceHistory([]);
        setStats({ sovereignty: 50, economy: 50, environment: 50, culture: 50 });
        setOutcome(null);
    };

    const resetGame = () => {
        setGameState("intro");
        setCurrentRoundId("round1");
        setChoiceHistory([]);
        setStats({ sovereignty: 50, economy: 50, environment: 50, culture: 50 });
        setOutcome(null);
    };

    const shareResult = () => {
        if (!outcome) return;
        const text = `I played "You Decide: Greenland's Future" and got: ${outcome.title}! ${outcome.emoji}\n\nOnly ${outcome.globalPercentage}% of players got this outcome.\n\nWhat future will YOU choose?`;
        if (navigator.share) {
            navigator.share({ title: "My Greenland Future", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen pt-20 gradient-game-vote text-glacier-white">
            <div className="section-container py-12 px-6">
                <AnimatePresence mode="wait">
                    {/* INTRO SCREEN */}
                    {gameState === "intro" && (
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
                                🗳️
                            </motion.span>

                            <h1 className="text-hero font-heading mb-6">You Decide</h1>
                            <p className="text-2xl text-arctic-ice mb-4">Greenland&apos;s Future</p>
                            <p className="text-body-large text-glacier-white/80 max-w-xl mx-auto mb-8">
                                Navigate 5 critical decisions that will shape Greenland by 2050.
                                Your choices determine independence, economy, environment, and culture.
                            </p>

                            {/* Stats explanation */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {[
                                    { icon: "🇬🇱", label: "Sovereignty", desc: "National independence" },
                                    { icon: "💰", label: "Economy", desc: "Wealth and development" },
                                    { icon: "🌿", label: "Environment", desc: "Climate & nature" },
                                    { icon: "🎭", label: "Culture", desc: "Inuit heritage" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-glacier-white/10 rounded-xl p-4 text-center"
                                    >
                                        <span className="text-2xl">{stat.icon}</span>
                                        <p className="font-bold mt-2">{stat.label}</p>
                                        <p className="text-xs text-glacier-white/60">{stat.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Player count */}
                            <div className="flex justify-center items-center gap-2 text-glacier-white/70 mb-8">
                                <Users className="w-5 h-5" />
                                <span>47,392 players have decided</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-12 py-5 rounded-2xl bg-glacier-white text-deep-navy font-bold text-xl hover:bg-arctic-ice transition-colors"
                            >
                                Start Deciding
                                <ChevronRight className="inline-block ml-2 w-6 h-6" />
                            </motion.button>

                            <p className="text-sm text-glacier-white/50 mt-6">⏱️ Takes 5-7 minutes</p>
                        </motion.div>
                    )}

                    {/* PLAYING SCREEN */}
                    {gameState === "playing" && currentRound && (
                        <motion.div
                            key={currentRoundId}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="max-w-4xl mx-auto"
                        >
                            {/* Progress & Stats Bar */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                {/* Round indicator */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-glacier-white/60">Round</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <div
                                                key={num}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${num < currentRound.roundNumber
                                                        ? "bg-success text-glacier-white"
                                                        : num === currentRound.roundNumber
                                                            ? "bg-glacier-white text-deep-navy"
                                                            : "bg-glacier-white/20 text-glacier-white/50"
                                                    }`}
                                            >
                                                {num < currentRound.roundNumber ? "✓" : num}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Live stats */}
                                <div className="flex gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <span>🇬🇱</span>
                                        <span className={stats.sovereignty > 50 ? "text-success" : stats.sovereignty < 50 ? "text-urgent-red" : ""}>
                                            {stats.sovereignty}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>💰</span>
                                        <span className={stats.economy > 50 ? "text-success" : stats.economy < 50 ? "text-urgent-red" : ""}>
                                            {stats.economy}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>🌿</span>
                                        <span className={stats.environment > 50 ? "text-success" : stats.environment < 50 ? "text-urgent-red" : ""}>
                                            {stats.environment}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>🎭</span>
                                        <span className={stats.culture > 50 ? "text-success" : stats.culture < 50 ? "text-urgent-red" : ""}>
                                            {stats.culture}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Scenario Card */}
                            <div className="bg-glacier-white/10 backdrop-blur rounded-3xl p-8 mb-8">
                                <h2 className="text-3xl font-bold font-heading mb-4">
                                    {currentRound.title}
                                </h2>
                                <p className="text-lg text-glacier-white/90 mb-4">
                                    {currentRound.scenario}
                                </p>
                                <p className="text-sm text-glacier-white/60 p-4 bg-glacier-white/5 rounded-xl">
                                    ℹ️ {currentRound.context}
                                </p>
                            </div>

                            {/* Choices */}
                            <div className="space-y-4">
                                <p className="text-sm text-glacier-white/60 text-center mb-4">
                                    Choose your path:
                                </p>
                                {currentRound.choices.map((choice, index) => (
                                    <motion.button
                                        key={choice.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.01, x: 8 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleChoice(choice)}
                                        disabled={isAnimating}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${isAnimating
                                                ? "opacity-50 cursor-not-allowed"
                                                : "bg-glacier-white/5 hover:bg-glacier-white/15 border-glacier-white/20 hover:border-glacier-white/50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{choice.emoji}</span>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-1">{choice.text}</h3>
                                                <p className="text-glacier-white/70">{choice.description}</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-glacier-white/50 self-center" />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {gameState === "result" && outcome && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-9xl mb-8"
                            >
                                {outcome.emoji}
                            </motion.div>

                            <h1 className="text-hero font-heading mb-4">{outcome.title}</h1>
                            <p className="text-xl text-arctic-ice mb-8">{outcome.description}</p>

                            {/* Stats breakdown */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { icon: "🇬🇱", label: "Sovereignty", value: outcome.stats.sovereignty },
                                    { icon: "💰", label: "Economy", value: outcome.stats.economy },
                                    { icon: "🌿", label: "Environment", value: outcome.stats.environment },
                                    { icon: "🎭", label: "Culture", value: outcome.stats.culture },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-glacier-white/10 rounded-xl p-4"
                                    >
                                        <span className="text-2xl">{stat.icon}</span>
                                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                        <p className="text-sm text-glacier-white/60">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Detailed outcome */}
                            <div className="bg-glacier-white/10 rounded-2xl p-6 mb-8 text-left">
                                <h3 className="font-bold text-lg mb-3">Your Future Greenland:</h3>
                                <p className="text-glacier-white/80">{outcome.detailedOutcome}</p>
                            </div>

                            {/* Global comparison */}
                            <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-glacier-white/5 rounded-xl">
                                <Trophy className="w-6 h-6 text-resource-gold" />
                                <span>
                                    <strong>{outcome.globalPercentage}%</strong> of players reached this outcome
                                </span>
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
                                    onClick={resetGame}
                                    className="px-8 py-4 rounded-xl bg-glacier-white/10 border border-glacier-white/30 font-bold flex items-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Play Again
                                </motion.button>
                            </div>

                            {/* Back to games */}
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
