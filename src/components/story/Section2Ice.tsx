"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";

interface Section2Props {
    sectionIndex: number;
}

// Ice mass loss data (simplified for visualization)
const iceData = [
    { year: 1992, mass: 0 },
    { year: 1995, mass: -50 },
    { year: 2000, mass: -150 },
    { year: 2005, mass: -500 },
    { year: 2010, mass: -1500 },
    { year: 2012, mass: -2500 },
    { year: 2015, mass: -3500 },
    { year: 2018, mass: -4500 },
    { year: 2020, mass: -5000 },
    { year: 2023, mass: -5800 },
    { year: 2025, mass: -6200, projected: true },
    { year: 2030, mass: -7500, projected: true },
    { year: 2040, mass: -10000, projected: true },
    { year: 2050, mass: -13000, projected: true },
];

// Live counter simulation
function useMeltCounter() {
    const [melted, setMelted] = useState(0);
    const startTime = useRef(Date.now());

    useEffect(() => {
        // Average melt rate: ~267 GT per year = ~8.5 tonnes per second
        const TONNES_PER_SECOND = 8500;

        const interval = setInterval(() => {
            const elapsed = (Date.now() - startTime.current) / 1000;
            setMelted(Math.floor(elapsed * TONNES_PER_SECOND));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return melted;
}

export default function Section2Ice({ sectionIndex }: Section2Props) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const meltedTonnes = useMeltCounter();

    // Handle slider drag
    const handleSliderMove = (clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleSliderMove(e.clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) handleSliderMove(e.touches[0].clientX);
    };

    // Format large numbers
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-deep-navy via-info/20 to-arctic-ice text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-arctic-ice mb-4 block">
                        Section 02
                    </span>
                    <h2 className="text-page-title font-heading mb-4 text-glacier-white">The Ice</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        Greenland&apos;s ice sheet is{" "}
                        <span className="font-bold text-arctic-ice">3 km thick</span> and holds
                        enough water to raise global sea levels by 7 meters.
                    </p>
                </motion.div>

                {/* Before/After Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-xl font-bold text-center mb-6">
                        Arctic Sea Ice: 1985 vs 2024
                    </h3>

                    <div
                        ref={sliderRef}
                        className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                        onTouchMove={handleTouchMove}
                    >
                        {/* "Before" Image - 1985 (more ice) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-glacier-white via-arctic-ice to-info"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-deep-navy">
                                    <span className="text-6xl md:text-8xl">❄️</span>
                                    <p className="text-2xl font-bold mt-4">1985</p>
                                    <p className="text-sm">Healthy Ice Coverage</p>
                                </div>
                            </div>
                            {/* Ice pattern overlay */}
                            <div className="absolute inset-0 opacity-30">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-16 h-16 bg-glacier-white/40 rounded-full blur-xl"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* "After" Image - 2024 (less ice) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-urgent-red/30 via-resource-gold/30 to-deep-navy">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-glacier-white">
                                    <span className="text-6xl md:text-8xl">🌊</span>
                                    <p className="text-2xl font-bold mt-4">2024</p>
                                    <p className="text-sm">Dramatic Ice Loss</p>
                                </div>
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-glacier-white shadow-lg"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-glacier-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
                                <span className="text-deep-navy text-xl">↔</span>
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="absolute bottom-4 left-4 bg-deep-navy/80 px-3 py-1 rounded text-sm">
                            1985
                        </div>
                        <div className="absolute bottom-4 right-4 bg-urgent-red/80 px-3 py-1 rounded text-sm">
                            2024
                        </div>
                    </div>

                    <p className="text-center text-glacier-white/60 mt-4 text-sm">
                        ↔ Drag the slider to compare ice coverage
                    </p>
                </motion.div>

                {/* Ice Mass Loss Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-deep-navy/50 backdrop-blur rounded-2xl p-6 md:p-8 mb-12"
                >
                    <h3 className="text-xl font-bold mb-6">
                        Cumulative Ice Mass Loss (Gigatonnes)
                    </h3>

                    <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={iceData}>
                                <defs>
                                    <linearGradient id="iceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                <XAxis
                                    dataKey="year"
                                    stroke="#ffffff80"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#ffffff80"
                                    fontSize={12}
                                    tickFormatter={(value) => `${value / 1000}K`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0A2463",
                                        border: "1px solid #ffffff30",
                                        borderRadius: "8px",
                                    }}
                                    labelStyle={{ color: "#E8F4F8" }}
                                    formatter={(value) => [
                                        `${Number(value).toLocaleString()} GT`,
                                        "Ice Loss",
                                    ]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="mass"
                                    stroke="#FF6B35"
                                    strokeWidth={3}
                                    fill="url(#iceGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-urgent-red rounded" />
                            <span>Observed data</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-urgent-red/50 rounded" />
                            <span>Projected (if current trend continues)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Live Melt Counter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-urgent-red/20 border border-urgent-red/40 rounded-2xl p-8 text-center"
                >
                    <p className="text-sm uppercase tracking-widest text-urgent-red mb-4">
                        ⚠️ Ice melted since you opened this page
                    </p>
                    <motion.p
                        key={meltedTonnes}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-5xl md:text-7xl font-bold text-urgent-red font-heading"
                    >
                        {formatNumber(meltedTonnes)}
                    </motion.p>
                    <p className="text-xl text-glacier-white mt-2">tonnes of ice</p>
                    <p className="text-sm text-glacier-white/60 mt-4">
                        Average melt rate: ~267 billion tonnes per year
                    </p>
                </motion.div>

                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        {
                            value: "7m",
                            label: "Sea Level Rise",
                            sublabel: "If all ice melted",
                            color: "text-urgent-red",
                        },
                        {
                            value: "1.5°C",
                            label: "Warming Since 1900",
                            sublabel: "Arctic warming 2x faster",
                            color: "text-resource-gold",
                        },
                        {
                            value: "2100",
                            label: "Ice-Free Summers",
                            sublabel: "Possible by this year",
                            color: "text-info",
                        },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 bg-deep-navy/30 rounded-2xl"
                        >
                            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="font-medium mt-2 text-glacier-white">{stat.label}</p>
                            <p className="text-sm text-glacier-white/60">{stat.sublabel}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
