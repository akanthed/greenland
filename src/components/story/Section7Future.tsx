"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";

interface Section7Props {
    sectionIndex: number;
}

interface SliderConfig {
    id: string;
    label: string;
    description: string;
    min: number;
    max: number;
    defaultValue: number;
    unit: string;
    options: { value: number; label: string }[];
}

const sliders: SliderConfig[] = [
    {
        id: "climate",
        label: "Climate Trajectory",
        description: "How quickly does global warming progress?",
        min: 0,
        max: 100,
        defaultValue: 50,
        unit: "",
        options: [
            { value: 0, label: "Paris Goals Met" },
            { value: 33, label: "Moderate Warming" },
            { value: 66, label: "High Emissions" },
            { value: 100, label: "Worst Case" },
        ],
    },
    {
        id: "politics",
        label: "Political Path",
        description: "Greenland's governance in 2050",
        min: 0,
        max: 100,
        defaultValue: 50,
        unit: "",
        options: [
            { value: 0, label: "Full Danish Union" },
            { value: 33, label: "Enhanced Autonomy" },
            { value: 66, label: "Independence" },
            { value: 100, label: "US Territory" },
        ],
    },
    {
        id: "development",
        label: "Resource Development",
        description: "Level of mining and extraction",
        min: 0,
        max: 100,
        defaultValue: 50,
        unit: "",
        options: [
            { value: 0, label: "Protected Land" },
            { value: 33, label: "Limited Mining" },
            { value: 66, label: "Major Development" },
            { value: 100, label: "Extraction Rush" },
        ],
    },
];

// Scenario outcomes based on slider combinations
function generateScenario(values: Record<string, number>) {
    const climate = values.climate;
    const politics = values.politics;
    const development = values.development;

    // Ice remaining calculation
    const iceRemaining = Math.max(10, 100 - (climate * 0.5));

    // Population projection
    const basePop = 56000;
    const popModifier = development > 50 ? 1.5 : politics > 66 ? 0.9 : 1.1;
    const population = Math.round(basePop * popModifier);

    // GDP projection (billions)
    const baseGDP = 3;
    const gdp = development > 66
        ? 15 + (development * 0.2)
        : development > 33
            ? 8
            : 5;

    // Sovereignty index
    const sovereignty = politics > 66 ? 95 : politics > 33 ? 70 : 40;

    // Generate scenario title
    let title = "";
    let description = "";
    let emoji = "";

    if (politics > 80) {
        title = "The 51st State";
        description = "Greenland becomes US territory, trading sovereignty for security and development funding.";
        emoji = "🇺🇸";
    } else if (politics > 60 && development > 60) {
        title = "The Mining Republic";
        description = "Independent Greenland funds itself through massive resource extraction, becoming wealthy but environmentally scarred.";
        emoji = "💎";
    } else if (politics > 60 && climate < 40) {
        title = "The Green Nation";
        description = "Independent Greenland becomes a global leader in sustainable development and climate research.";
        emoji = "🌿";
    } else if (climate > 70) {
        title = "The Thaw";
        description = "Catastrophic ice loss reshapes Greenland entirely. New coastlines emerge, but at devastating ecological cost.";
        emoji = "🌊";
    } else if (development < 30 && politics < 40) {
        title = "The Preserved Arctic";
        description = "Greenland remains protected under Danish stewardship, prioritizing conservation over development.";
        emoji = "❄️";
    } else {
        title = "The Balanced Path";
        description = "Greenland finds a middle ground: moderate development, enhanced autonomy, and careful resource management.";
        emoji = "⚖️";
    }

    return {
        title,
        description,
        emoji,
        stats: {
            iceRemaining: Math.round(iceRemaining),
            population,
            gdp: gdp.toFixed(1),
            sovereignty,
        },
    };
}

export default function Section7Future({ sectionIndex }: Section7Props) {
    const [values, setValues] = useState<Record<string, number>>({
        climate: 50,
        politics: 50,
        development: 50,
    });

    const scenario = useMemo(() => generateScenario(values), [values]);

    const handleSliderChange = (id: string, value: number) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const resetSliders = () => {
        setValues({ climate: 50, politics: 50, development: 50 });
    };

    const getClosestOption = (slider: SliderConfig, value: number) => {
        return slider.options.reduce((prev, curr) =>
            Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-urgent-red/10 via-deep-navy to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-urgent-red mb-4 block">
                        Section 07
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Future</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        What will Greenland look like in{" "}
                        <span className="font-bold text-urgent-red">2050</span>? Adjust the
                        sliders to explore different scenarios.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Sliders Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-glacier-white/5 backdrop-blur rounded-3xl p-6 md:p-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Adjust Variables</h3>
                            <button
                                onClick={resetSliders}
                                className="flex items-center gap-2 text-sm text-glacier-white/70 hover:text-glacier-white transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>

                        <div className="space-y-8">
                            {sliders.map((slider) => {
                                const currentOption = getClosestOption(slider, values[slider.id]);

                                return (
                                    <div key={slider.id}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <label className="font-medium block">{slider.label}</label>
                                                <p className="text-sm text-glacier-white/60">
                                                    {slider.description}
                                                </p>
                                            </div>
                                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-glacier-white/10">
                                                {currentOption.label}
                                            </span>
                                        </div>

                                        {/* Custom slider */}
                                        <div className="relative mt-4">
                                            <input
                                                type="range"
                                                min={slider.min}
                                                max={slider.max}
                                                value={values[slider.id]}
                                                onChange={(e) =>
                                                    handleSliderChange(slider.id, parseInt(e.target.value))
                                                }
                                                className="w-full h-2 bg-glacier-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                                                style={{
                                                    background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${values[slider.id]}%, rgba(255,255,255,0.2) ${values[slider.id]}%, rgba(255,255,255,0.2) 100%)`,
                                                }}
                                            />
                                            {/* Option markers */}
                                            <div className="flex justify-between mt-2">
                                                {slider.options.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleSliderChange(slider.id, opt.value)}
                                                        className="text-xs text-glacier-white/50 hover:text-glacier-white transition-colors"
                                                        style={{
                                                            position: "absolute",
                                                            left: `${opt.value}%`,
                                                            transform: "translateX(-50%)",
                                                            bottom: "-20px",
                                                        }}
                                                    >
                                                        •
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-urgent-red/20 to-deep-navy/50 backdrop-blur rounded-3xl p-6 md:p-8 border border-urgent-red/30"
                    >
                        {/* Scenario Title */}
                        <motion.div
                            key={scenario.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mb-8"
                        >
                            <span className="text-6xl mb-4 block">{scenario.emoji}</span>
                            <h3 className="text-2xl font-bold text-urgent-red">{scenario.title}</h3>
                            <p className="text-glacier-white/80 mt-2">{scenario.description}</p>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <motion.div
                                key={scenario.stats.iceRemaining}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-glacier-white/10 rounded-xl p-4 text-center"
                            >
                                <p className="text-3xl font-bold text-arctic-ice">
                                    {scenario.stats.iceRemaining}%
                                </p>
                                <p className="text-sm text-glacier-white/60">Ice Remaining</p>
                            </motion.div>

                            <motion.div
                                key={scenario.stats.population}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-glacier-white/10 rounded-xl p-4 text-center"
                            >
                                <p className="text-3xl font-bold text-environment-green">
                                    {(scenario.stats.population / 1000).toFixed(0)}K
                                </p>
                                <p className="text-sm text-glacier-white/60">Population</p>
                            </motion.div>

                            <motion.div
                                key={scenario.stats.gdp}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-glacier-white/10 rounded-xl p-4 text-center"
                            >
                                <p className="text-3xl font-bold text-resource-gold">
                                    ${scenario.stats.gdp}B
                                </p>
                                <p className="text-sm text-glacier-white/60">GDP</p>
                            </motion.div>

                            <motion.div
                                key={scenario.stats.sovereignty}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-glacier-white/10 rounded-xl p-4 text-center"
                            >
                                <p className="text-3xl font-bold text-info">
                                    {scenario.stats.sovereignty}%
                                </p>
                                <p className="text-sm text-glacier-white/60">Sovereignty</p>
                            </motion.div>
                        </div>

                        {/* Share Button */}
                        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-urgent-red hover:bg-urgent-red/80 text-glacier-white font-bold transition-colors">
                            <Share2 className="w-5 h-5" />
                            Share This Future
                        </button>
                    </motion.div>
                </div>

                {/* Disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-glacier-white/50 mt-12"
                >
                    This simulator is for educational purposes. Real outcomes depend on countless
                    factors and the decisions of the Greenlandic people.
                </motion.p>
            </div>

            {/* Custom slider styling */}
            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
        </div>
    );
}
