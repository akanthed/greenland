"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Globe, BookOpen, BarChart2, Gamepad2, Info } from "lucide-react";

const steps = [
    {
        title: "Welcome to the Forbidden Island",
        description: "Greenland is more than just 'ice on a map'. It's the $280 Trillion battleground for our future. This site is your dynamic guide to its secrets.",
        icon: <Globe className="w-12 h-12 text-info" />,
        color: "blue"
    },
    {
        title: "Shift Your Perspective",
        description: "Every section of this site changes based on your chosen 'lens'. Want to see through US Security eyes? Or hear the Indigenous Voice? Use the toggle in the top-right header anytime.",
        icon: <div className="flex gap-2"><span className="text-2xl">🇺🇸</span><span className="text-2xl">🇬🇱</span></div>,
        color: "green"
    },
    {
        title: "Story vs. Data",
        description: "Explore the 'Story' for a narrative journey through history and culture, or dive into 'Data' for real-time climate stats and economic visualizations.",
        icon: <div className="flex gap-4"><BookOpen className="w-8 h-8 text-blue-400" /><BarChart2 className="w-8 h-8 text-orange-400" /></div>,
        color: "gold"
    },
    {
        title: "Engage & Play",
        description: "Don't just read—compete! Play strategy games, vote in live geopolitical polls, and build your own vision of the Arctic in our interactive modules.",
        icon: <Gamepad2 className="w-12 h-12 text-purple-500" />,
        color: "purple"
    }
];

export function OnboardingTour() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem("greenland-onboarding-seen");
        if (!hasSeenTour) {
            const timer = setTimeout(() => setIsVisible(true), 1500); // Show after a delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            closeTour();
        }
    };

    const closeTour = () => {
        setIsVisible(false);
        localStorage.setItem("greenland-onboarding-seen", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-deep-navy/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-glacier-white rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeTour}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-light-bg text-cool-gray transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Progress Bar */}
                        <div className="flex h-1.5 w-full bg-border-gray">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-full flex-1 transition-all duration-500 ${i <= currentStep ? "bg-info" : ""}`}
                                />
                            ))}
                        </div>

                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="mb-6 p-6 rounded-2xl bg-light-bg border border-border-gray shadow-inner">
                                        {steps[currentStep].icon}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-dark-slate mb-4">
                                        {steps[currentStep].title}
                                    </h3>

                                    <p className="text-body text-cool-gray mb-10 leading-relaxed">
                                        {steps[currentStep].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-border-gray">
                                <button
                                    onClick={closeTour}
                                    className="text-cool-gray font-medium hover:text-dark-slate transition-colors"
                                >
                                    Skip
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 btn btn-primary py-3 px-8 rounded-full shadow-lg hover:shadow-info/20"
                                >
                                    {currentStep === steps.length - 1 ? "Start Exploring" : "Next"}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
