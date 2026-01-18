"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart2, Activity } from "lucide-react";

interface PollOption {
    id: string;
    label: string;
    votes: number;
}

// SIMULATED DATA - In production, this would come from a real-time database
// Current numbers are based on hypothetical distribution for demonstration
const getSimulatedPollData = () => {
    // Add slight random variation to make it feel "live"
    const baseVotes = {
        independent: 15847,
        denmark: 12234,
        usa: 11298,
        autonomy: 8013,
    };

    return {
        question: "Greenland's future should be:",
        totalVotes: Object.values(baseVotes).reduce((a, b) => a + b, 0),
        options: [
            { id: "independent", label: "Independent Nation", votes: baseVotes.independent },
            { id: "denmark", label: "Remain with Denmark", votes: baseVotes.denmark },
            { id: "usa", label: "Join United States", votes: baseVotes.usa },
            { id: "autonomy", label: "Enhanced Autonomy", votes: baseVotes.autonomy },
        ] as PollOption[],
    };
};

export function LivePollWidget() {
    const [pollData, setPollData] = useState(getSimulatedPollData());
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    // Simulate "live" votes coming in occasionally (demo feature)
    useEffect(() => {
        const interval = setInterval(() => {
            setPollData(prev => {
                const randomOption = prev.options[Math.floor(Math.random() * prev.options.length)];
                const increment = Math.floor(Math.random() * 3) + 1;
                return {
                    ...prev,
                    totalVotes: prev.totalVotes + increment,
                    options: prev.options.map(opt =>
                        opt.id === randomOption.id
                            ? { ...opt, votes: opt.votes + increment }
                            : opt
                    ),
                };
            });
        }, 15000); // Add votes every 15 seconds

        return () => clearInterval(interval);
    }, []);

    const handleVote = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const submitVote = () => {
        if (selectedOption) {
            // Add user's vote to the simulated count
            setPollData(prev => ({
                ...prev,
                totalVotes: prev.totalVotes + 1,
                options: prev.options.map(opt =>
                    opt.id === selectedOption
                        ? { ...opt, votes: opt.votes + 1 }
                        : opt
                ),
            }));
            setHasVoted(true);
            // In production, this would send to backend
        }
    };

    const getPercentage = (votes: number) => {
        return ((votes / pollData.totalVotes) * 100).toFixed(1);
    };

    return (
        <section className="min-h-[60vh] py-24 px-6 bg-gradient-to-b from-glacier-white to-light-bg">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-section-heading text-dark-slate font-heading mb-4">
                        What Do You Think?
                    </h2>
                    <p className="text-body-large text-cool-gray">
                        Join{" "}
                        <span className="font-bold text-info">
                            {pollData.totalVotes.toLocaleString()}
                        </span>{" "}
                        people who&apos;ve voted
                    </p>
                    {/* Simulated data indicator */}
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-info/10 text-info text-xs">
                        <Activity className="w-3 h-3" />
                        <span>Live Demo Mode</span>
                    </div>
                </motion.div>

                {/* Poll Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto bg-glacier-white rounded-3xl shadow-xl p-8 md:p-12"
                >
                    {/* Question */}
                    <h3 className="text-xl md:text-2xl font-bold text-dark-slate mb-8">
                        {pollData.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {!hasVoted ? (
                                // Voting state
                                <motion.div
                                    key="voting"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-3"
                                >
                                    {pollData.options.map((option) => (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => handleVote(option.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedOption === option.id
                                                ? "border-info bg-info/5"
                                                : "border-border-gray hover:border-cool-gray"
                                                }`}
                                        >
                                            {/* Radio circle */}
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === option.id
                                                    ? "border-info"
                                                    : "border-cool-gray"
                                                    }`}
                                            >
                                                {selectedOption === option.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-3 h-3 rounded-full bg-info"
                                                    />
                                                )}
                                            </div>
                                            <span className="text-dark-slate font-medium">
                                                {option.label}
                                            </span>
                                        </motion.button>
                                    ))}

                                    {/* Vote button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={submitVote}
                                        disabled={!selectedOption}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-6 ${selectedOption
                                            ? "bg-info text-glacier-white hover:bg-blue-600"
                                            : "bg-border-gray text-cool-gray cursor-not-allowed"
                                            }`}
                                    >
                                        Vote Now
                                    </motion.button>
                                </motion.div>
                            ) : (
                                // Results state
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-2 text-success font-medium mb-6">
                                        <span className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 text-glacier-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </span>
                                        Your vote has been recorded!
                                    </div>

                                    {pollData.options.map((option, index) => {
                                        const percentage = parseFloat(getPercentage(option.votes));
                                        const isSelected = selectedOption === option.id;

                                        return (
                                            <motion.div
                                                key={option.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="relative"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span
                                                        className={`font-medium ${isSelected ? "text-info" : "text-dark-slate"
                                                            }`}
                                                    >
                                                        {option.label}
                                                        {isSelected && " ✓"}
                                                    </span>
                                                    <span className="text-cool-gray text-sm">
                                                        {percentage}% ({option.votes.toLocaleString()})
                                                    </span>
                                                </div>
                                                <div className="h-3 bg-light-bg rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{ duration: 1, delay: index * 0.1 }}
                                                        className={`h-full rounded-full ${isSelected
                                                            ? "bg-gradient-to-r from-info to-blue-400"
                                                            : "bg-border-gray"
                                                            }`}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* See all polls CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/polls"
                        className="btn btn-secondary btn-lg inline-flex items-center gap-2"
                    >
                        <BarChart2 className="w-5 h-5" />
                        See All Polls & Results
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
