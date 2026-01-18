"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerspective } from "@/lib/context/PerspectiveContext";

interface Section1Props {
    sectionIndex: number;
}

// Countries/regions to compare with Greenland
const comparisons = [
    {
        id: "usa-states",
        label: "US States Combined",
        items: [
            { name: "Texas", area: 695662, emoji: "🤠" },
            { name: "California", area: 423967, emoji: "🌴" },
            { name: "Montana", area: 380831, emoji: "🏔️" },
            { name: "New Mexico", area: 314917, emoji: "🌵" },
            { name: "Arizona", area: 295234, emoji: "🏜️" },
        ],
        totalArea: 2110611,
        comparison: "Almost fits inside Greenland!",
    },
    {
        id: "europe",
        label: "European Countries",
        items: [
            { name: "France", area: 643801, emoji: "🇫🇷" },
            { name: "Spain", area: 505990, emoji: "🇪🇸" },
            { name: "Sweden", area: 450295, emoji: "🇸🇪" },
            { name: "Germany", area: 357114, emoji: "🇩🇪" },
            { name: "UK", area: 242900, emoji: "🇬🇧" },
        ],
        totalArea: 2200100,
        comparison: "Western Europe's largest nations combined!",
    },
    {
        id: "countries",
        label: "Individual Countries",
        items: [
            { name: "Mexico", area: 1964375, emoji: "🇲🇽" },
            { name: "Indonesia", area: 1904569, emoji: "🇮🇩" },
            { name: "Sudan", area: 1861484, emoji: "🇸🇩" },
            { name: "Libya", area: 1759540, emoji: "🇱🇾" },
        ],
        totalArea: 0,
        comparison: "Greenland is larger than all of these!",
    },
];

const GREENLAND_AREA = 2166086; // km²

export default function Section1Scale({ sectionIndex }: Section1Props) {
    const [selectedComparison, setSelectedComparison] = useState(0);
    const { perspectiveInfo } = usePerspective();

    const currentComparison = comparisons[selectedComparison];

    // Calculate percentage of Greenland each item covers
    const calculatePercentage = (area: number) => {
        return ((area / GREENLAND_AREA) * 100).toFixed(1);
    };

    return (
        <div className="min-h-screen gradient-hero text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-arctic-ice mb-4 block">
                        Section 01
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Scale</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        Greenland is the world&apos;s largest island at{" "}
                        <span className="font-bold text-arctic-ice">2,166,086 km²</span> — but
                        what does that actually mean?
                    </p>
                </motion.div>

                {/* Comparison Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {comparisons.map((comp, index) => (
                        <button
                            key={comp.id}
                            onClick={() => setSelectedComparison(index)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${selectedComparison === index
                                    ? "bg-glacier-white text-deep-navy"
                                    : "bg-glacier-white/10 hover:bg-glacier-white/20"
                                }`}
                        >
                            {comp.label}
                        </button>
                    ))}
                </div>

                {/* Interactive Comparison Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-glacier-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
                >
                    {/* Greenland Outline (simplified) */}
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Greenland visualization */}
                        <div className="flex-1 flex flex-col items-center">
                            <div className="relative w-64 h-80 md:w-80 md:h-96">
                                {/* Greenland shape (simplified) */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 bg-gradient-to-b from-arctic-ice to-glacier-white rounded-[40%_60%_70%_30%/50%_40%_60%_50%] shadow-2xl flex items-center justify-center"
                                >
                                    <div className="text-center text-deep-navy">
                                        <span className="text-5xl">🇬🇱</span>
                                        <p className="font-bold text-xl mt-2">GREENLAND</p>
                                        <p className="text-sm">2,166,086 km²</p>
                                    </div>
                                </motion.div>

                                {/* Stacked comparison items */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentComparison.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="absolute -right-8 md:-right-16 top-0 flex flex-col gap-2"
                                    >
                                        {currentComparison.items.slice(0, 3).map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-info flex items-center justify-center text-2xl shadow-lg"
                                                style={{
                                                    transform: `scale(${Math.min(item.area / 500000, 1)})`,
                                                }}
                                            >
                                                {item.emoji}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Comparison Details */}
                        <div className="flex-1 w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentComparison.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <h3 className="text-2xl font-bold mb-6">
                                        {currentComparison.label}
                                    </h3>

                                    <div className="space-y-4">
                                        {currentComparison.items.map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="bg-glacier-white/10 rounded-xl p-4"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-xl">{item.emoji}</span>
                                                        <span className="font-medium">{item.name}</span>
                                                    </span>
                                                    <span className="text-arctic-ice font-bold">
                                                        {calculatePercentage(item.area)}%
                                                    </span>
                                                </div>
                                                {/* Progress bar */}
                                                <div className="h-2 bg-glacier-white/20 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${calculatePercentage(item.area)}%` }}
                                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                                        className="h-full bg-gradient-to-r from-info to-arctic-ice rounded-full"
                                                    />
                                                </div>
                                                <p className="text-sm text-glacier-white/60 mt-1">
                                                    {item.area.toLocaleString()} km²
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {currentComparison.totalArea > 0 && (
                                        <div className="mt-6 p-4 bg-success/20 rounded-xl border border-success/40">
                                            <p className="text-success font-medium">
                                                📊 Combined: {currentComparison.totalArea.toLocaleString()} km²
                                            </p>
                                            <p className="text-glacier-white/80 mt-1">
                                                {currentComparison.comparison}
                                            </p>
                                        </div>
                                    )}

                                    {currentComparison.totalArea === 0 && (
                                        <div className="mt-6 p-4 bg-info/20 rounded-xl border border-info/40">
                                            <p className="text-info font-medium">
                                                🏆 {currentComparison.comparison}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        { value: "#1", label: "Largest Island", sublabel: "In the world" },
                        { value: "836K", label: "Miles of Coast", sublabel: "12th longest globally" },
                        { value: "0.03", label: "People per km²", sublabel: "Least dense nation" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 bg-glacier-white/5 rounded-2xl"
                        >
                            <p className="text-4xl font-bold text-arctic-ice">{stat.value}</p>
                            <p className="font-medium mt-2">{stat.label}</p>
                            <p className="text-sm text-glacier-white/60">{stat.sublabel}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
