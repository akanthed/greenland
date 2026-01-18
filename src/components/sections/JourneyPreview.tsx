"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface JourneySection {
    id: number;
    title: string;
    description: string;
    href: string;
    color: string;
    icon: string;
}

const sections: JourneySection[] = [
    {
        id: 1,
        title: "The Scale",
        description: "Discover why Greenland's size defies comprehension and what it means for global politics.",
        href: "/story#scale",
        color: "#3B82F6",
        icon: "🗺️",
    },
    {
        id: 2,
        title: "The Ice",
        description: "Witness the dramatic transformation as one of Earth's largest ice sheets melts before our eyes.",
        href: "/story#ice",
        color: "#60A5FA",
        icon: "🧊",
    },
    {
        id: 3,
        title: "The People",
        description: "Hear from the 56,000 people who call this land home and shape its future.",
        href: "/story#people",
        color: "#10B981",
        icon: "👥",
    },
    {
        id: 4,
        title: "The Players",
        description: "Understand the complex web of nations vying for influence in the Arctic.",
        href: "/story#players",
        color: "#6366F1",
        icon: "🌐",
    },
    {
        id: 5,
        title: "The Resources",
        description: "Explore $280+ trillion in untapped minerals beneath the melting ice.",
        href: "/story#resources",
        color: "#F59E0B",
        icon: "💎",
    },
    {
        id: 6,
        title: "The Timeline",
        description: "A millennium of history from Norse explorers to modern geopolitics.",
        href: "/story#timeline",
        color: "#8B5CF6",
        icon: "📜",
    },
    {
        id: 7,
        title: "The Future",
        description: "Simulate different scenarios and see what Greenland might look like in 2050.",
        href: "/story#future",
        color: "#EC4899",
        icon: "🔮",
    },
    {
        id: 8,
        title: "The Data",
        description: "Dive deep into the numbers with interactive charts and primary sources.",
        href: "/story#data",
        color: "#14B8A6",
        icon: "📊",
    },
];

export function JourneyPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <section className="min-h-screen py-24 px-6 gradient-hero">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-section-heading text-glacier-white font-heading mb-4">
                        Explore The Complete Story
                    </h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        8 chapters that will transform how you understand the world's largest island
                    </p>
                </motion.div>

                {/* Horizontal scroll container */}
                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {/* Left padding for centering */}
                    <div className="flex-shrink-0 w-6 md:w-12" />

                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-shrink-0 snap-center"
                        >
                            <Link href={section.href}>
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -8 }}
                                    className="w-[320px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden bg-glacier-white shadow-xl cursor-pointer group"
                                >
                                    {/* Image/Gradient area */}
                                    <div
                                        className="h-[200px] flex items-center justify-center relative"
                                        style={{
                                            background: `linear-gradient(135deg, ${section.color}40 0%, ${section.color}80 100%)`,
                                        }}
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-7xl"
                                        >
                                            {section.icon}
                                        </motion.span>

                                        {/* Section number badge */}
                                        <div
                                            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-glacier-white"
                                            style={{ backgroundColor: section.color }}
                                        >
                                            {section.id}
                                        </div>
                                    </div>

                                    {/* Content area */}
                                    <div className="p-8 h-[300px] flex flex-col">
                                        <h3 className="text-2xl font-bold text-dark-slate font-heading mb-4">
                                            {section.title}
                                        </h3>
                                        <p className="text-cool-gray flex-1 line-clamp-3">
                                            {section.description}
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-info font-semibold group-hover:gap-4 transition-all mt-6">
                                            <span>Explore</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Right padding */}
                    <div className="flex-shrink-0 w-6 md:w-12" />
                </div>

                {/* Scroll progress indicator */}
                <div className="flex justify-center mt-8">
                    <div className="w-48 h-1 bg-glacier-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-glacier-white rounded-full"
                            style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
                        />
                    </div>
                </div>

                {/* Full journey CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/story"
                        className="btn bg-glacier-white text-deep-navy hover:bg-arctic-ice btn-lg"
                    >
                        Start Full Journey
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
