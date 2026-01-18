"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Section1Scale from "@/components/story/Section1Scale";
import Section2Ice from "@/components/story/Section2Ice";
import Section3People from "@/components/story/Section3People";
import Section4Players from "@/components/story/Section4Players";
import Section5Resources from "@/components/story/Section5Resources";
import Section6Timeline from "@/components/story/Section6Timeline";
import Section7Future from "@/components/story/Section7Future";
import Section8Data from "@/components/story/Section8Data";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { ChevronUp, ChevronDown } from "lucide-react";

const sections = [
    { id: "scale", label: "The Scale", emoji: "🗺️", component: Section1Scale },
    { id: "ice", label: "The Ice", emoji: "🧊", component: Section2Ice },
    { id: "people", label: "The People", emoji: "👥", component: Section3People },
    { id: "players", label: "The Players", emoji: "🌐", component: Section4Players },
    { id: "resources", label: "The Resources", emoji: "💎", component: Section5Resources },
    { id: "timeline", label: "The Timeline", emoji: "📜", component: Section6Timeline },
    { id: "future", label: "The Future", emoji: "🔮", component: Section7Future },
    { id: "data", label: "The Data", emoji: "📊", component: Section8Data },
];

export default function StoryPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const [showNavHint, setShowNavHint] = useState(true);

    // Throttled scroll handler for better performance
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const scrollTop = containerRef.current.scrollTop;
        const sectionHeight = window.innerHeight;
        const newActive = Math.round(scrollTop / sectionHeight);
        setActiveSection(Math.min(Math.max(0, newActive), sections.length - 1));

        // Hide nav hint after first scroll
        if (scrollTop > 100 && showNavHint) {
            setShowNavHint(false);
        }
    }, [showNavHint]);

    // Track active section based on scroll with throttling
    useEffect(() => {
        let ticking = false;

        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const container = containerRef.current;
        container?.addEventListener("scroll", throttledScroll, { passive: true });
        return () => container?.removeEventListener("scroll", throttledScroll);
    }, [handleScroll]);

    const scrollToSection = (index: number) => {
        if (!containerRef.current) return;
        const targetElement = containerRef.current.children[index] as HTMLElement;
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    const goToPrev = () => {
        if (activeSection > 0) {
            scrollToSection(activeSection - 1);
        }
    };

    const goToNext = () => {
        if (activeSection < sections.length - 1) {
            scrollToSection(activeSection + 1);
        }
    };

    return (
        <div className="relative">
            {/* Floating particles background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <FloatingParticles
                    count={15}
                    colors={["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"]}
                />
            </div>

            {/* Section counter - Top Left */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed top-24 left-6 z-50 bg-deep-navy/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-glacier-white/20"
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[activeSection]?.emoji}</span>
                    <div>
                        <p className="text-xs text-glacier-white/60">Section {activeSection + 1} of {sections.length}</p>
                        <p className="font-bold text-glacier-white">{sections[activeSection]?.label}</p>
                    </div>
                </div>
            </motion.div>

            {/* Progress Indicator - Right Side */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
                {sections.map((section, index) => (
                    <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(index)}
                        className={`group flex items-center gap-3 transition-all`}
                        aria-label={`Go to ${section.label}`}
                        whileHover={{ x: -5 }}
                    >
                        {/* Label - shows on hover */}
                        <span
                            className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-deep-navy/80 px-2 py-1 rounded ${activeSection === index ? "text-glacier-white" : "text-glacier-white/70"
                                }`}
                        >
                            {section.emoji} {section.label}
                        </span>
                        {/* Dot with ring */}
                        <div className="relative">
                            <div
                                className={`w-3 h-3 rounded-full transition-all ${activeSection === index
                                    ? "bg-glacier-white scale-125"
                                    : "bg-glacier-white/40 hover:bg-glacier-white/70"
                                    }`}
                            />
                            {activeSection === index && (
                                <motion.div
                                    layoutId="activeRing"
                                    className="absolute -inset-1 rounded-full border-2 border-glacier-white/50"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Navigation Arrows - Bottom */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
                <AnimatePresence>
                    {activeSection > 0 && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={goToPrev}
                            className="p-2 rounded-full bg-glacier-white/10 backdrop-blur-sm border border-glacier-white/20 hover:bg-glacier-white/20 transition-colors"
                            aria-label="Previous section"
                        >
                            <ChevronUp className="w-5 h-5 text-glacier-white" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Section indicator pills */}
                <div className="flex gap-1.5 px-3 py-2 rounded-full bg-deep-navy/80 backdrop-blur-sm border border-glacier-white/20">
                    {sections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            className={`w-2 h-2 rounded-full transition-all ${activeSection === index
                                ? "bg-glacier-white w-6"
                                : "bg-glacier-white/30 hover:bg-glacier-white/50"
                                }`}
                            aria-label={`Go to section ${index + 1}`}
                        />
                    ))}
                </div>

                <AnimatePresence>
                    {activeSection < sections.length - 1 && (
                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={goToNext}
                            className="p-2 rounded-full bg-glacier-white/10 backdrop-blur-sm border border-glacier-white/20 hover:bg-glacier-white/20 transition-colors"
                            aria-label="Next section"
                        >
                            <ChevronDown className="w-5 h-5 text-glacier-white" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll hint - shows initially */}
            <AnimatePresence>
                {showNavHint && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 text-glacier-white/60 text-sm"
                    >
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span>Scroll or use arrows to navigate</span>
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar - Top */}
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 bg-glacier-white/10 z-40"
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-info via-game-purple to-urgent-red"
                    style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                />
            </motion.div>

            {/* Sections Container - Using proximity snap for smoother feel */}
            <div
                ref={containerRef}
                className="h-screen overflow-y-auto overflow-x-hidden scrollbar-hide"
                style={{
                    scrollBehavior: "smooth",
                    scrollSnapType: "y proximity",
                    WebkitOverflowScrolling: "touch"
                }}
            >
                {sections.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="min-h-screen relative"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <section.component sectionIndex={index} />
                    </section>
                ))}
            </div>
        </div>
    );
}

