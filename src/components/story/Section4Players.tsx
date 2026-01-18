"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerspective } from "@/lib/context/PerspectiveContext";

interface Section4Props {
    sectionIndex: number;
}

interface Nation {
    id: string;
    name: string;
    emoji: string;
    color: string;
    position: { x: number; y: number };
    influence: number; // 1-10
    interests: string[];
    actions: string[];
    relationship: string;
}

const nations: Nation[] = [
    {
        id: "usa",
        name: "United States",
        emoji: "🇺🇸",
        color: "#3B82F6",
        position: { x: -150, y: -80 },
        influence: 9,
        interests: [
            "Military presence via Thule Air Base",
            "Control of Northwest Passage",
            "Access to rare earth minerals",
            "Counter Chinese/Russian Arctic expansion",
        ],
        actions: [
            "Trump proposed purchase offer (2019, 2024)",
            "Reopened consulate in Nuuk (2020)",
            "Increased military aid and cooperation",
            "Proposed $850M development package",
        ],
        relationship: "Strategic ally with territorial ambitions",
    },
    {
        id: "denmark",
        name: "Denmark",
        emoji: "🇩🇰",
        color: "#EF4444",
        position: { x: 150, y: -80 },
        influence: 8,
        interests: [
            "Retain unity of Danish Realm",
            "Maintain strategic Arctic position",
            "Continue economic subsidies (~$500M/year)",
            "NATO obligations",
        ],
        actions: [
            "Provides annual block grants",
            "Controls foreign policy and defense",
            "Supports gradual autonomy expansion",
            "Building new Arctic military capabilities",
        ],
        relationship: "Colonial/parental relationship evolving toward equality",
    },
    {
        id: "china",
        name: "China",
        emoji: "🇨🇳",
        color: "#F59E0B",
        position: { x: 180, y: 80 },
        influence: 6,
        interests: [
            "Arctic shipping routes (Polar Silk Road)",
            "Rare earth mineral access",
            "Research station establishment",
            "Reduce Western rare earth dominance",
        ],
        actions: [
            "Attempted airport investments (blocked)",
            "Mining company interest in Isua project",
            "Research vessel expeditions",
            "Economic partnership proposals",
        ],
        relationship: "Economic suitor viewed with suspicion",
    },
    {
        id: "russia",
        name: "Russia",
        emoji: "🇷🇺",
        color: "#8B5CF6",
        position: { x: -180, y: 80 },
        influence: 5,
        interests: [
            "Arctic military dominance",
            "Northern Sea Route control",
            "Counter NATO expansion",
            "Territorial claims extension",
        ],
        actions: [
            "Increased Arctic military activity",
            "Reopened Soviet-era bases",
            "Flag planting on seabed (2007)",
            "UNCLOS shelf extension claims",
        ],
        relationship: "Distant competitor, not direct partner",
    },
    {
        id: "eu",
        name: "European Union",
        emoji: "🇪🇺",
        color: "#10B981",
        position: { x: 0, y: 150 },
        influence: 4,
        interests: [
            "Climate change research",
            "Environmental protection",
            "Critical minerals for green transition",
            "Maintain Arctic stability",
        ],
        actions: [
            "Arctic policy framework adoption",
            "Research funding programs",
            "Diplomatic observer at Arctic Council",
            "Green mining investment interest",
        ],
        relationship: "Supportive partner through Denmark connection",
    },
];

export default function Section4Players({ sectionIndex }: Section4Props) {
    const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
    const { currentPerspective } = usePerspective();

    return (
        <div className="min-h-screen bg-gradient-to-b from-deep-navy via-info/10 to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-info mb-4 block">
                        Section 04
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Players</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        A web of{" "}
                        <span className="font-bold text-info">competing interests</span>{" "}
                        surrounds this strategic Arctic territory.
                    </p>
                </motion.div>

                {/* Relationship Diagram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-glacier-white/5 backdrop-blur rounded-3xl p-8 md:p-12 min-h-[500px] flex items-center justify-center"
                >
                    {/* Central Greenland Node */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-environment-green to-deep-navy flex items-center justify-center shadow-2xl border-4 border-glacier-white/30"
                    >
                        <div className="text-center">
                            <span className="text-4xl md:text-5xl">🇬🇱</span>
                            <p className="font-bold text-sm mt-1">GREENLAND</p>
                        </div>
                    </motion.div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {nations.map((nation) => {
                            const centerX = "50%";
                            const centerY = "50%";
                            return (
                                <motion.line
                                    key={`line-${nation.id}`}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    x1={centerX}
                                    y1={centerY}
                                    x2={`calc(50% + ${nation.position.x}px)`}
                                    y2={`calc(50% + ${nation.position.y}px)`}
                                    stroke={nation.color}
                                    strokeWidth={nation.influence / 2}
                                    strokeOpacity={0.4}
                                    strokeDasharray={selectedNation?.id === nation.id ? "0" : "5 5"}
                                />
                            );
                        })}
                    </svg>

                    {/* Nation Nodes */}
                    {nations.map((nation, index) => (
                        <motion.button
                            key={nation.id}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedNation(nation)}
                            className="absolute flex flex-col items-center"
                            style={{
                                left: `calc(50% + ${nation.position.x}px)`,
                                top: `calc(50% + ${nation.position.y}px)`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${selectedNation?.id === nation.id
                                        ? "border-glacier-white scale-110"
                                        : "border-transparent"
                                    }`}
                                style={{ backgroundColor: nation.color }}
                            >
                                <span className="text-2xl md:text-3xl">{nation.emoji}</span>
                            </div>
                            <p className="text-xs font-medium mt-2 whitespace-nowrap">
                                {nation.name}
                            </p>
                            {/* Influence indicator */}
                            <div className="flex gap-0.5 mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full ${i < nation.influence / 2
                                                ? "bg-glacier-white"
                                                : "bg-glacier-white/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Nation Details Panel */}
                <AnimatePresence mode="wait">
                    {selectedNation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8 bg-glacier-white/10 backdrop-blur rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: selectedNation.color }}
                                    >
                                        {selectedNation.emoji}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{selectedNation.name}</h3>
                                        <p className="text-glacier-white/70">
                                            Influence Level: {selectedNation.influence}/10
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedNation(null)}
                                    className="text-glacier-white/60 hover:text-glacier-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Interests */}
                                <div>
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span>🎯</span> Strategic Interests
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedNation.interests.map((interest, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-start gap-2 text-glacier-white/80"
                                            >
                                                <span className="text-info">•</span>
                                                {interest}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div>
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <span>⚡</span> Recent Actions
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedNation.actions.map((action, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 + 0.2 }}
                                                className="flex items-start gap-2 text-glacier-white/80"
                                            >
                                                <span className="text-resource-gold">→</span>
                                                {action}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Relationship summary */}
                            <div
                                className="mt-6 p-4 rounded-xl border"
                                style={{
                                    backgroundColor: `${selectedNation.color}20`,
                                    borderColor: `${selectedNation.color}40`,
                                }}
                            >
                                <p className="font-medium">
                                    <span className="opacity-70">Relationship with Greenland:</span>{" "}
                                    {selectedNation.relationship}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!selectedNation && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-glacier-white/60 mt-8"
                    >
                        ↑ Click on any nation to see their interests and actions
                    </motion.p>
                )}

                {/* Key insight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 p-6 bg-info/10 border border-info/30 rounded-2xl"
                >
                    <p className="text-lg">
                        <span className="font-bold text-info">The Arctic Gold Rush:</span>{" "}
                        As ice melts, competition intensifies. Greenland is at the center.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
