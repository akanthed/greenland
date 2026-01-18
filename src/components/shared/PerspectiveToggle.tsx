"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    usePerspective,
    perspectives,
    PerspectiveType,
} from "@/lib/context/PerspectiveContext";

interface PerspectiveToggleProps {
    onSelect?: () => void;
    compact?: boolean;
}

export function PerspectiveToggle({ onSelect, compact = false }: PerspectiveToggleProps) {
    const { currentPerspective, setPerspective, allPerspectives } = usePerspective();

    const handleSelect = (id: PerspectiveType) => {
        setPerspective(id);
        onSelect?.();
    };

    if (compact) {
        return (
            <div className="flex flex-col gap-2">
                {allPerspectives.map((perspective) => (
                    <button
                        key={perspective.id}
                        onClick={() => handleSelect(perspective.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPerspective === perspective.id
                                ? "bg-glacier-white text-deep-navy"
                                : "text-glacier-white hover:bg-white/10"
                            }`}
                    >
                        <span className="text-xl">{perspective.icon}</span>
                        <span className="font-medium">{perspective.label}</span>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-glacier-white rounded-2xl shadow-xl p-6 border border-border-gray">
            <p className="text-sm text-cool-gray mb-4 font-medium">Choose Your Perspective</p>
            <div className="flex flex-col gap-3">
                {allPerspectives.map((perspective) => (
                    <motion.button
                        key={perspective.id}
                        onClick={() => handleSelect(perspective.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-start gap-4 p-4 rounded-xl transition-all border-2 ${currentPerspective === perspective.id
                                ? "border-info bg-info/5"
                                : "border-transparent bg-light-bg hover:border-border-gray"
                            }`}
                    >
                        <span
                            className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${perspective.color}20` }}
                        >
                            {perspective.icon}
                        </span>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-dark-slate">{perspective.label}</p>
                            <p className="text-sm text-cool-gray mt-1">{perspective.description}</p>
                        </div>
                        {currentPerspective === perspective.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-info flex items-center justify-center"
                            >
                                <svg
                                    className="w-4 h-4 text-glacier-white"
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
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
            <p className="text-xs text-cool-gray mt-4 text-center">
                Content across the site will adapt to your chosen perspective
            </p>
        </div>
    );
}
