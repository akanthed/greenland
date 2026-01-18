"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Share2,
    Users,
    TrendingUp,
    Clock,
    CheckCircle2,
    BarChart3,
    Globe,
    Vote,
    Sparkles,
    ChevronRight,
    AlertCircle,
} from "lucide-react";

// Types
interface PollOption {
    id: string;
    text: string;
    votes: number;
    emoji?: string;
}

interface Poll {
    id: string;
    question: string;
    description?: string;
    category: "independence" | "economy" | "environment" | "culture" | "geopolitics";
    options: PollOption[];
    totalVotes: number;
    featured?: boolean;
    createdAt: string;
    endsIn?: string;
}

// Mock polls data
const pollsData: Poll[] = [
    {
        id: "independence-2030",
        question: "When should Greenland become fully independent from Denmark?",
        description: "Greenland currently has self-rule but Denmark handles defense and foreign affairs.",
        category: "independence",
        featured: true,
        options: [
            { id: "2030", text: "By 2030", votes: 12847, emoji: "🚀" },
            { id: "2040", text: "By 2040", votes: 18923, emoji: "📅" },
            { id: "2050", text: "By 2050 or later", votes: 8234, emoji: "⏳" },
            { id: "never", text: "Stay with Denmark", votes: 7156, emoji: "🇩🇰" },
        ],
        totalVotes: 47160,
        createdAt: "2025-12-01",
        endsIn: "2 days",
    },
    {
        id: "us-military",
        question: "Should the US be allowed to expand Pituffik Space Base?",
        description: "The US has proposed expanding military presence in exchange for economic investment.",
        category: "geopolitics",
        options: [
            { id: "yes-full", text: "Yes, with full expansion", votes: 8932, emoji: "✅" },
            { id: "yes-limited", text: "Yes, but limited scope", votes: 14267, emoji: "⚖️" },
            { id: "no", text: "No expansion allowed", votes: 11843, emoji: "❌" },
            { id: "remove", text: "Remove all US presence", votes: 4521, emoji: "🚫" },
        ],
        totalVotes: 39563,
        createdAt: "2025-12-10",
    },
    {
        id: "mining-priority",
        question: "What should be the priority for mineral extraction?",
        category: "economy",
        options: [
            { id: "max-extraction", text: "Maximize extraction for revenue", votes: 7823, emoji: "💰" },
            { id: "sustainable", text: "Sustainable extraction only", votes: 21456, emoji: "♻️" },
            { id: "limited", text: "Very limited, protect environment", votes: 12934, emoji: "🌿" },
            { id: "ban", text: "Ban mining entirely", votes: 3287, emoji: "🚫" },
        ],
        totalVotes: 45500,
        createdAt: "2025-12-05",
    },
    {
        id: "climate-action",
        question: "What climate action should Greenland prioritize?",
        category: "environment",
        options: [
            { id: "research", text: "Climate research leadership", votes: 15673, emoji: "🔬" },
            { id: "green-economy", text: "100% green energy economy", votes: 18234, emoji: "🌍" },
            { id: "adaptation", text: "Focus on local adaptation", votes: 9876, emoji: "🏔️" },
            { id: "compensation", text: "Demand global compensation", votes: 6543, emoji: "💵" },
        ],
        totalVotes: 50326,
        createdAt: "2025-12-08",
    },
    {
        id: "inuit-culture",
        question: "How should Inuit culture be preserved in modernization?",
        category: "culture",
        options: [
            { id: "priority", text: "Top priority in all decisions", votes: 19823, emoji: "🎭" },
            { id: "balance", text: "Balance with development", votes: 14567, emoji: "⚖️" },
            { id: "communities", text: "Let communities decide", votes: 11234, emoji: "👥" },
            { id: "evolve", text: "Culture will naturally evolve", votes: 4123, emoji: "🔄" },
        ],
        totalVotes: 49747,
        createdAt: "2025-12-12",
        endsIn: "5 days",
    },
    {
        id: "tourism-limit",
        question: "Should Greenland limit annual tourist numbers?",
        category: "economy",
        options: [
            { id: "no-limit", text: "No limit, maximize tourism", votes: 8234, emoji: "🚢" },
            { id: "moderate", text: "Moderate cap of 100,000/year", votes: 16789, emoji: "📊" },
            { id: "strict", text: "Strict cap of 50,000/year", votes: 12345, emoji: "🎫" },
            { id: "eco-only", text: "Only eco-tourism allowed", votes: 9876, emoji: "🌲" },
        ],
        totalVotes: 47244,
        createdAt: "2025-12-15",
    },
];

const categoryInfo = {
    independence: { label: "Independence", color: "#3B82F6", icon: "🇬🇱" },
    economy: { label: "Economy", color: "#F59E0B", icon: "💰" },
    environment: { label: "Environment", color: "#22C55E", icon: "🌿" },
    culture: { label: "Culture", color: "#8B5CF6", icon: "🎭" },
    geopolitics: { label: "Geopolitics", color: "#EF4444", icon: "🌐" },
};

export default function PollsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState<Record<string, boolean>>({});
    const [animatedVotes, setAnimatedVotes] = useState<Record<string, number>>({});

    // Simulate live vote updates
    useEffect(() => {
        const interval = setInterval(() => {
            const pollIndex = Math.floor(Math.random() * pollsData.length);
            const poll = pollsData[pollIndex];
            const optionIndex = Math.floor(Math.random() * poll.options.length);
            const optionId = poll.options[optionIndex].id;

            setAnimatedVotes((prev) => ({
                ...prev,
                [`${poll.id}-${optionId}`]: (prev[`${poll.id}-${optionId}`] || 0) + 1,
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleVote = (pollId: string, optionId: string) => {
        if (votedPolls[pollId]) return;

        setVotedPolls((prev) => ({ ...prev, [pollId]: optionId }));
        setShowResults((prev) => ({ ...prev, [pollId]: true }));
    };

    const getPercentage = (votes: number, total: number, pollId: string, optionId: string) => {
        const extraVotes = animatedVotes[`${pollId}-${optionId}`] || 0;
        return Math.round(((votes + extraVotes) / (total + Object.keys(animatedVotes).filter(k => k.startsWith(pollId)).reduce((acc, k) => acc + (animatedVotes[k] || 0), 0))) * 100);
    };

    const sharePoll = (poll: Poll, optionId?: string) => {
        const option = poll.options.find((o) => o.id === optionId);
        const text = optionId
            ? `I voted "${option?.text}" on: "${poll.question}" 🗳️\n\nJoin the global conversation about Greenland's future!`
            : `"${poll.question}" - Cast your vote on Greenland's future! 🇬🇱`;

        if (navigator.share) {
            navigator.share({ title: "Greenland Poll", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        }
    };

    const filteredPolls = selectedCategory
        ? pollsData.filter((p) => p.category === selectedCategory)
        : pollsData;

    const featuredPoll = pollsData.find((p) => p.featured);
    const regularPolls = filteredPolls.filter((p) => !p.featured || selectedCategory);

    const totalVotes = pollsData.reduce((acc, poll) => acc + poll.totalVotes, 0);
    const totalParticipants = Math.floor(totalVotes / 3.5); // Estimate unique participants

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-b from-deep-navy via-medium-navy to-deep-navy text-glacier-white">
            <div className="section-container py-16 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-poll-orange/20 text-poll-orange mb-6"
                    >
                        <Vote className="w-4 h-4" />
                        <span className="text-sm font-bold">Live Global Polls</span>
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </motion.div>

                    <h1 className="text-hero font-heading mb-6">
                        Your Voice,{" "}
                        <span className="bg-gradient-to-r from-poll-orange to-urgent-red bg-clip-text text-transparent">
                            Global Impact
                        </span>
                    </h1>
                    <p className="text-body-large text-glacier-white/70 max-w-2xl mx-auto">
                        Join thousands of people shaping the conversation about Greenland&apos;s future.
                        Every vote counts. Every opinion matters.
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
                                <p className="text-xl font-bold">{totalParticipants.toLocaleString()}</p>
                                <p className="text-xs text-glacier-white/60">Participants</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glacier-white/10 backdrop-blur">
                            <BarChart3 className="w-5 h-5 text-poll-orange" />
                            <div className="text-left">
                                <p className="text-xl font-bold">{totalVotes.toLocaleString()}</p>
                                <p className="text-xs text-glacier-white/60">Total Votes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-glacier-white/10 backdrop-blur">
                            <Globe className="w-5 h-5 text-success" />
                            <div className="text-left">
                                <p className="text-xl font-bold">{pollsData.length}</p>
                                <p className="text-xs text-glacier-white/60">Active Polls</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full font-bold transition-all ${selectedCategory === null
                                ? "bg-glacier-white text-deep-navy"
                                : "bg-glacier-white/10 hover:bg-glacier-white/20"
                            }`}
                    >
                        All Topics
                    </button>
                    {Object.entries(categoryInfo).map(([key, info]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
                            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${selectedCategory === key
                                    ? "bg-glacier-white text-deep-navy"
                                    : "bg-glacier-white/10 hover:bg-glacier-white/20"
                                }`}
                            style={{ borderColor: selectedCategory === key ? info.color : "transparent" }}
                        >
                            <span>{info.icon}</span>
                            {info.label}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Poll */}
                {featuredPoll && !selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="bg-gradient-to-br from-poll-orange/20 to-urgent-red/20 rounded-3xl p-8 border border-poll-orange/30">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-poll-orange/30 text-poll-orange text-sm font-bold flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    FEATURED POLL
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-bold"
                                    style={{ backgroundColor: `${categoryInfo[featuredPoll.category].color}20`, color: categoryInfo[featuredPoll.category].color }}
                                >
                                    {categoryInfo[featuredPoll.category].icon} {categoryInfo[featuredPoll.category].label}
                                </span>
                                {featuredPoll.endsIn && (
                                    <span className="px-3 py-1 rounded-full bg-glacier-white/10 text-sm flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Ends in {featuredPoll.endsIn}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold font-heading mb-2">{featuredPoll.question}</h2>
                            {featuredPoll.description && (
                                <p className="text-glacier-white/70 mb-6">{featuredPoll.description}</p>
                            )}

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                {featuredPoll.options.map((option) => {
                                    const hasVoted = votedPolls[featuredPoll.id];
                                    const isSelected = votedPolls[featuredPoll.id] === option.id;
                                    const percentage = getPercentage(option.votes, featuredPoll.totalVotes, featuredPoll.id, option.id);

                                    return (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ scale: hasVoted ? 1 : 1.02 }}
                                            whileTap={{ scale: hasVoted ? 1 : 0.98 }}
                                            onClick={() => handleVote(featuredPoll.id, option.id)}
                                            disabled={!!hasVoted}
                                            className={`relative overflow-hidden p-5 rounded-2xl text-left transition-all ${hasVoted
                                                    ? isSelected
                                                        ? "border-2 border-success bg-success/10"
                                                        : "border-2 border-glacier-white/20 bg-glacier-white/5"
                                                    : "border-2 border-glacier-white/30 bg-glacier-white/10 hover:border-glacier-white/60 cursor-pointer"
                                                }`}
                                        >
                                            {/* Progress bar background */}
                                            {(showResults[featuredPoll.id] || hasVoted) && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="absolute inset-0 bg-glacier-white/10"
                                                />
                                            )}

                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{option.emoji}</span>
                                                    <span className="font-bold">{option.text}</span>
                                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-success" />}
                                                </div>
                                                {(showResults[featuredPoll.id] || hasVoted) && (
                                                    <span className="font-bold text-lg">{percentage}%</span>
                                                )}
                                            </div>

                                            {(showResults[featuredPoll.id] || hasVoted) && (
                                                <p className="relative z-10 text-sm text-glacier-white/60 mt-2">
                                                    {(option.votes + (animatedVotes[`${featuredPoll.id}-${option.id}`] || 0)).toLocaleString()} votes
                                                </p>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-glacier-white/60">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    {featuredPoll.totalVotes.toLocaleString()} total votes
                                </p>
                                <button
                                    onClick={() => sharePoll(featuredPoll, votedPolls[featuredPoll.id])}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-glacier-white/10 hover:bg-glacier-white/20 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Regular Polls Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {regularPolls.map((poll, index) => (
                        <motion.div
                            key={poll.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-glacier-white/5 rounded-2xl p-6 border border-glacier-white/10 hover:border-glacier-white/30 transition-all"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-bold"
                                    style={{ backgroundColor: `${categoryInfo[poll.category].color}20`, color: categoryInfo[poll.category].color }}
                                >
                                    {categoryInfo[poll.category].icon} {categoryInfo[poll.category].label}
                                </span>
                                {poll.endsIn && (
                                    <span className="px-2 py-1 rounded-full bg-glacier-white/10 text-xs flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {poll.endsIn}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold mb-4">{poll.question}</h3>

                            <div className="space-y-3 mb-4">
                                {poll.options.map((option) => {
                                    const hasVoted = votedPolls[poll.id];
                                    const isSelected = votedPolls[poll.id] === option.id;
                                    const percentage = getPercentage(option.votes, poll.totalVotes, poll.id, option.id);

                                    return (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ scale: hasVoted ? 1 : 1.01 }}
                                            whileTap={{ scale: hasVoted ? 1 : 0.99 }}
                                            onClick={() => handleVote(poll.id, option.id)}
                                            disabled={!!hasVoted}
                                            className={`relative overflow-hidden w-full p-3 rounded-xl text-left transition-all ${hasVoted
                                                    ? isSelected
                                                        ? "border-2 border-success bg-success/10"
                                                        : "border border-glacier-white/10 bg-glacier-white/5"
                                                    : "border border-glacier-white/20 bg-glacier-white/5 hover:border-glacier-white/40 cursor-pointer"
                                                }`}
                                        >
                                            {/* Progress bar */}
                                            {(showResults[poll.id] || hasVoted) && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                    className="absolute inset-0 bg-glacier-white/10"
                                                />
                                            )}

                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span>{option.emoji}</span>
                                                    <span className="text-sm">{option.text}</span>
                                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-success" />}
                                                </div>
                                                {(showResults[poll.id] || hasVoted) && (
                                                    <span className="text-sm font-bold">{percentage}%</span>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between text-sm text-glacier-white/60">
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {poll.totalVotes.toLocaleString()} votes
                                </span>
                                <button
                                    onClick={() => sharePoll(poll, votedPolls[poll.id])}
                                    className="flex items-center gap-1 hover:text-glacier-white transition-colors"
                                >
                                    <Share2 className="w-3 h-3" />
                                    Share
                                </button>
                            </div>
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
                    <div className="bg-glacier-white/5 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-glacier-white/10">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-poll-orange" />
                        <h3 className="text-2xl font-bold mb-4">
                            Want Deeper Engagement?
                        </h3>
                        <p className="text-glacier-white/70 mb-6">
                            These polls capture global sentiment, but to truly understand the issues,
                            explore our interactive story and games.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/story">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-glacier-white text-deep-navy font-bold"
                                >
                                    📖 Read the Story
                                </motion.button>
                            </a>
                            <a href="/games">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-glacier-white/10 border border-glacier-white/20 font-bold hover:bg-glacier-white/20 transition-colors"
                                >
                                    🎮 Play the Games
                                </motion.button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
