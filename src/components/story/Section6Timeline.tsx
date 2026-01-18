"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Section6Props {
    sectionIndex: number;
}

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    impact: string;
    emoji: string;
    era: "ancient" | "colonial" | "modern" | "contemporary";
}

const timelineEvents: TimelineEvent[] = [
    {
        year: "982",
        title: "Erik the Red Arrives",
        description: "Norse explorer Erik the Red establishes first European settlement, naming it 'Greenland' as a marketing ploy to attract settlers.",
        impact: "Norse colonies last ~500 years before mysteriously disappearing",
        emoji: "⛵",
        era: "ancient",
    },
    {
        year: "1721",
        title: "Danish Colonization Begins",
        description: "Hans Egede arrives to re-establish Nordic presence. Denmark claims Greenland as colony, beginning centuries of colonial rule.",
        impact: "Started 300 years of Danish control and cultural transformation",
        emoji: "⚓",
        era: "colonial",
    },
    {
        year: "1917",
        title: "US Purchase Attempt #1",
        description: "President Woodrow Wilson considers purchasing Greenland from Denmark during WWI due to strategic location.",
        impact: "Denmark refuses, but signals Greenland's strategic importance",
        emoji: "🇺🇸",
        era: "colonial",
    },
    {
        year: "1943",
        title: "US Military Arrives",
        description: "During WWII, US establishes military presence. Thule Air Base becomes key strategic installation during Cold War.",
        impact: "Begins permanent American military footprint in Greenland",
        emoji: "✈️",
        era: "colonial",
    },
    {
        year: "1953",
        title: "Greenland Joins Denmark",
        description: "Colonial status ends; Greenland becomes integral part of Danish kingdom. Greenlanders become Danish citizens.",
        impact: "Formal end of colonial status, but cultural dominance continues",
        emoji: "🇩🇰",
        era: "modern",
    },
    {
        year: "1979",
        title: "Home Rule Granted",
        description: "Greenland gains autonomy over internal affairs. First step toward self-governance after decades of advocacy.",
        impact: "Greenlandic becomes official language, local parliament established",
        emoji: "🏛️",
        era: "modern",
    },
    {
        year: "1985",
        title: "Greenland Leaves EU",
        description: "Greenland becomes first territory to withdraw from European Community, primarily over fishing rights disputes.",
        impact: "Demonstrates Greenlandic willingness to chart independent path",
        emoji: "🚪",
        era: "modern",
    },
    {
        year: "2009",
        title: "Self-Rule Act",
        description: "Expanded autonomy granted. Greenlandic recognized as sole official language. Right to independence acknowledged.",
        impact: "Legal framework for potential future independence established",
        emoji: "📜",
        era: "contemporary",
    },
    {
        year: "2019",
        title: "Trump Purchase Offer",
        description: "President Trump proposes buying Greenland from Denmark. Danish PM Frederiksen calls idea 'absurd.'",
        impact: "Global attention on Greenland's sovereignty and strategic value",
        emoji: "🏷️",
        era: "contemporary",
    },
    {
        year: "2021",
        title: "Oil Exploration Ban",
        description: "Greenland bans all oil and gas exploration, prioritizing climate concerns over potential revenues.",
        impact: "Major environmental stance affecting economic independence path",
        emoji: "🌍",
        era: "contemporary",
    },
    {
        year: "2024-25",
        title: "Trump 2.0: Renewed Interest",
        description: "Trump returns to presidency, renews interest in acquiring Greenland. Denmark affirms 'not for sale.'",
        impact: "Greenland's future becomes central geopolitical flashpoint",
        emoji: "🔥",
        era: "contemporary",
    },
];

const eraColors = {
    ancient: "#8B5CF6",
    colonial: "#EF4444",
    modern: "#F59E0B",
    contemporary: "#10B981",
};

export default function Section6Timeline({ sectionIndex }: Section6Props) {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 400;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-game-purple/20 via-deep-navy to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-game-purple mb-4 block">
                        Section 06
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Timeline</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        Over <span className="font-bold text-game-purple">1,000 years</span> of
                        history, from Norse explorers to modern geopolitics.
                    </p>
                </motion.div>

                {/* Era Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-8"
                >
                    {Object.entries(eraColors).map(([era, color]) => (
                        <div key={era} className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-sm capitalize">{era}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Timeline Navigation */}
                <div className="relative">
                    {/* Scroll buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-deep-navy/80 hover:bg-deep-navy flex items-center justify-center shadow-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-deep-navy/80 hover:bg-deep-navy flex items-center justify-center shadow-lg transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Timeline Track */}
                    <div
                        ref={scrollRef}
                        className="overflow-x-auto scrollbar-hide py-8"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        <div className="flex gap-6 px-16 min-w-max">
                            {timelineEvents.map((event, index) => (
                                <motion.button
                                    key={event.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    onClick={() => setSelectedEvent(event)}
                                    className="flex-shrink-0 w-64 snap-center"
                                    style={{ scrollSnapAlign: "center" }}
                                >
                                    <div
                                        className="relative bg-glacier-white/5 hover:bg-glacier-white/10 rounded-2xl p-6 text-left transition-all border-2 h-full"
                                        style={{ borderColor: eraColors[event.era] }}
                                    >
                                        {/* Year badge */}
                                        <div
                                            className="absolute -top-4 left-6 px-4 py-1 rounded-full text-sm font-bold text-glacier-white"
                                            style={{ backgroundColor: eraColors[event.era] }}
                                        >
                                            {event.year}
                                        </div>

                                        {/* Emoji */}
                                        <div className="text-4xl mb-4 mt-2">{event.emoji}</div>

                                        {/* Title */}
                                        <h4 className="font-bold text-lg mb-2">{event.title}</h4>

                                        {/* Description preview */}
                                        <p className="text-sm text-glacier-white/70 line-clamp-2">
                                            {event.description}
                                        </p>

                                        {/* Click indicator */}
                                        <p className="text-xs text-glacier-white/50 mt-4">
                                            Click for details →
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Timeline line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 mx-16">
                            <div className="h-full bg-gradient-to-r from-game-purple/50 via-resource-gold/50 to-environment-green/50 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Event Detail Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-8 bg-glacier-white/10 backdrop-blur rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{selectedEvent.emoji}</span>
                                    <div>
                                        <div
                                            className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2"
                                            style={{ backgroundColor: eraColors[selectedEvent.era] }}
                                        >
                                            {selectedEvent.year}
                                        </div>
                                        <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="text-glacier-white/60 hover:text-glacier-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-lg text-glacier-white/90 mb-6">
                                {selectedEvent.description}
                            </p>

                            <div
                                className="p-4 rounded-xl border"
                                style={{
                                    backgroundColor: `${eraColors[selectedEvent.era]}20`,
                                    borderColor: `${eraColors[selectedEvent.era]}40`,
                                }}
                            >
                                <p className="font-medium">
                                    <span className="opacity-70">Historical Impact:</span>{" "}
                                    {selectedEvent.impact}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Key insight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-lg text-glacier-white/80">
                        <span className="font-bold text-game-purple">From colony to crossroads:</span>{" "}
                        Greenland's path to self-determination continues.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
