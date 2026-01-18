"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-deep-navy text-glacier-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">Our Mission</h1>
                    <p className="text-xl text-glacier-white/70">
                        Shifting perspectives on the Arctic's most strategic island.
                    </p>
                </motion.div>

                <div className="grid gap-12 text-lg leading-relaxed text-glacier-white/80">
                    <section>
                        <h2 className="text-3xl font-heading font-bold text-glacier-white mb-4">Why Greenland?</h2>
                        <p>
                            Greenland is often seen as a distant, frozen wasteland. But today, it is at the crossroads
                            of the greatest challenges of our century: the climate crisis, the struggle for
                            clean energy resources, and high-stakes global geopolitics.
                        </p>
                    </section>

                    <section id="methodology">
                        <h2 className="text-3xl font-heading font-bold text-glacier-white mb-4">Our Methodology</h2>
                        <p>
                            We combine satellite data, economic reports, and first-hand historical accounts to
                            create an interactive experience that goes beyond the headlines. Our goal is to
                            provide a balanced view—acknowledging the environmental stakes while respecting
                            the sovereign aspirations of the Greenlandic people.
                        </p>
                    </section>

                    <section id="team">
                        <h2 className="text-3xl font-heading font-bold text-glacier-white mb-4">The Team</h2>
                        <p>
                            This project was founded by Akshay Kanthed, alongside a global community of
                            designers and data scientists dedicated to transparent, engaging journalism.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
