"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePerspective, perspectives, PerspectiveType } from "@/lib/context/PerspectiveContext";

export function PerspectiveSelector() {
    const { currentPerspective, setPerspective } = usePerspective();

    const handleSelect = (id: PerspectiveType) => {
        setPerspective(id);
    };

    const perspectiveList = Object.values(perspectives);

    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 bg-light-bg">
            <div className="section-container text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-section-heading text-dark-slate font-heading mb-4"
                >
                    Choose Your Perspective
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-body-large text-cool-gray max-w-2xl mx-auto mb-12"
                >
                    Every story has multiple sides. How do you want to explore Greenland?
                </motion.p>

                {/* Perspective Cards Grid */}
                <div className="flex flex-wrap justify-center gap-8">
                    {perspectiveList.map((perspective, index) => (
                        <motion.button
                            key={perspective.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(perspective.id)}
                            className={`
                relative w-[280px] h-[320px] rounded-3xl p-8
                flex flex-col items-center justify-center text-center
                transition-all duration-300
                ${currentPerspective === perspective.id
                                    ? "bg-deep-navy text-glacier-white shadow-2xl"
                                    : "glass-card text-dark-slate hover:bg-glacier-white hover:shadow-xl"
                                }
              `}
                        >
                            {/* Active indicator */}
                            {currentPerspective === perspective.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-success flex items-center justify-center"
                                >
                                    <svg
                                        className="w-5 h-5 text-glacier-white"
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

                            {/* Icon */}
                            <motion.span
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="text-6xl mb-6"
                            >
                                {perspective.icon}
                            </motion.span>

                            {/* Label */}
                            <h3 className="text-xl font-bold font-heading mb-2">
                                {perspective.label}
                            </h3>

                            {/* Description */}
                            <p
                                className={`text-sm ${currentPerspective === perspective.id
                                        ? "text-glacier-white/80"
                                        : "text-cool-gray"
                                    }`}
                            >
                                {perspective.description}
                            </p>

                            {/* Color accent bar */}
                            <div
                                className={`absolute bottom-0 left-8 right-8 h-1 rounded-full transition-opacity ${currentPerspective === perspective.id ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{ backgroundColor: perspective.color }}
                            />
                        </motion.button>
                    ))}
                </div>

                {/* Helper text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-caption text-cool-gray mt-12"
                >
                    Click any perspective to filter content across the site
                </motion.p>
            </div>
        </section>
    );
}
