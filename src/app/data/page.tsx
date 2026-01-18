"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Globe,
    Thermometer,
    DollarSign,
    Users,
    Mountain,
    Droplets,
    Wind,
    ExternalLink,
    Info,
    ChevronRight,
} from "lucide-react";

// Types
interface DataCard {
    id: string;
    title: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: React.ReactNode;
    description: string;
    source: string;
    category: string;
}

interface ChartData {
    label: string;
    value: number;
    color: string;
}

// Key statistics
const keyStats: DataCard[] = [
    {
        id: "area",
        title: "Total Area",
        value: "2,166,086 km²",
        icon: <Mountain className="w-6 h-6" />,
        description: "World's largest island, 3x size of Texas",
        source: "Statistics Greenland",
        category: "geography",
    },
    {
        id: "ice-cover",
        title: "Ice Sheet Coverage",
        value: "82%",
        change: "-1.2% per decade",
        changeType: "negative",
        icon: <Droplets className="w-6 h-6" />,
        description: "1.71 million km² of ice sheet",
        source: "NASA GRACE",
        category: "climate",
    },
    {
        id: "population",
        title: "Population",
        value: "56,421",
        change: "+0.3% annually",
        changeType: "positive",
        icon: <Users className="w-6 h-6" />,
        description: "88% are Greenlandic Inuit",
        source: "Statistics Greenland 2024",
        category: "society",
    },
    {
        id: "ice-loss",
        title: "Annual Ice Loss",
        value: "270 Gt/year",
        change: "↑ accelerating",
        changeType: "negative",
        icon: <TrendingDown className="w-6 h-6" />,
        description: "Equivalent to 270 billion metric tons",
        source: "IPCC AR6",
        category: "climate",
    },
    {
        id: "minerals",
        title: "Mineral Value",
        value: "$280+ Trillion",
        change: "Estimated",
        changeType: "neutral",
        icon: <DollarSign className="w-6 h-6" />,
        description: "Including rare earth elements",
        source: "USGS Estimates",
        category: "economy",
    },
    {
        id: "temperature",
        title: "Avg Temperature Rise",
        value: "+3.2°C",
        change: "Since 1970",
        changeType: "negative",
        icon: <Thermometer className="w-6 h-6" />,
        description: "2x faster than global average",
        source: "DMI Denmark",
        category: "climate",
    },
    {
        id: "gdp",
        title: "GDP",
        value: "$3.1 Billion",
        change: "+2.1% growth",
        changeType: "positive",
        icon: <TrendingUp className="w-6 h-6" />,
        description: "~$55,000 per capita",
        source: "World Bank 2023",
        category: "economy",
    },
    {
        id: "danish-subsidy",
        title: "Danish Subsidy",
        value: "$540 Million",
        change: "Annual",
        changeType: "neutral",
        icon: <Globe className="w-6 h-6" />,
        description: "~50% of government revenue",
        source: "Danish Ministry",
        category: "economy",
    },
];

// Ice loss data by decade
const iceLossData: ChartData[] = [
    { label: "1990s", value: 34, color: "#60A5FA" },
    { label: "2000s", value: 187, color: "#3B82F6" },
    { label: "2010s", value: 244, color: "#2563EB" },
    { label: "2020s", value: 280, color: "#1D4ED8" },
];

// Resource distribution
const resourceData: ChartData[] = [
    { label: "Rare Earth", value: 35, color: "#8B5CF6" },
    { label: "Zinc", value: 25, color: "#6366F1" },
    { label: "Uranium", value: 20, color: "#EF4444" },
    { label: "Iron Ore", value: 12, color: "#F59E0B" },
    { label: "Other", value: 8, color: "#10B981" },
];

// Categories
const categories = [
    { id: "all", label: "All Data", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "climate", label: "Climate", icon: <Thermometer className="w-4 h-4" /> },
    { id: "economy", label: "Economy", icon: <DollarSign className="w-4 h-4" /> },
    { id: "society", label: "Society", icon: <Users className="w-4 h-4" /> },
    { id: "geography", label: "Geography", icon: <Mountain className="w-4 h-4" /> },
];

// Data sources
const dataSources = [
    { name: "NASA Climate", url: "https://climate.nasa.gov/", icon: "🛰️" },
    { name: "NOAA Arctic", url: "https://arctic.noaa.gov/", icon: "🌊" },
    { name: "Statistics Greenland", url: "https://stat.gl/", icon: "📊" },
    { name: "USGS", url: "https://www.usgs.gov/", icon: "🏔️" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function DataPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const filteredStats = selectedCategory === "all"
        ? keyStats
        : keyStats.filter((stat) => stat.category === selectedCategory);

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-b from-deep-navy via-medium-navy to-deep-navy text-glacier-white">
            <div className="section-container py-16 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/20 text-info mb-6"
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span className="text-sm font-bold">Interactive Data Dashboard</span>
                    </motion.div>

                    <h1 className="text-hero font-heading mb-6">
                        Greenland{" "}
                        <span className="bg-gradient-to-r from-info to-game-purple bg-clip-text text-transparent">
                            By The Numbers
                        </span>
                    </h1>
                    <p className="text-body-large text-glacier-white/70 max-w-2xl mx-auto">
                        Explore key statistics, trends, and data visualizations about Greenland&apos;s
                        climate, economy, society, and geography.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${selectedCategory === category.id
                                    ? "bg-glacier-white text-deep-navy"
                                    : "bg-glacier-white/10 hover:bg-glacier-white/20"
                                }`}
                        >
                            {category.icon}
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Key Statistics Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredStats.map((stat) => (
                            <motion.div
                                key={stat.id}
                                variants={itemVariants}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onMouseEnter={() => setHoveredCard(stat.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="relative bg-glacier-white/5 rounded-2xl p-6 border border-glacier-white/10 hover:border-glacier-white/30 transition-all group cursor-pointer overflow-hidden"
                            >
                                {/* Background glow on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br from-info/10 to-transparent transition-opacity ${hoveredCard === stat.id ? "opacity-100" : "opacity-0"
                                        }`}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-xl ${stat.changeType === "positive"
                                                    ? "bg-success/20 text-success"
                                                    : stat.changeType === "negative"
                                                        ? "bg-urgent-red/20 text-urgent-red"
                                                        : "bg-info/20 text-info"
                                                }`}
                                        >
                                            {stat.icon}
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredCard === stat.id ? 1 : 0 }}
                                            className="p-1 rounded-full bg-glacier-white/10"
                                        >
                                            <Info className="w-4 h-4" />
                                        </motion.div>
                                    </div>

                                    <h3 className="text-sm text-glacier-white/60 mb-1">{stat.title}</h3>
                                    <p className="text-3xl font-bold mb-2">{stat.value}</p>

                                    {stat.change && (
                                        <div
                                            className={`flex items-center gap-1 text-sm ${stat.changeType === "positive"
                                                    ? "text-success"
                                                    : stat.changeType === "negative"
                                                        ? "text-urgent-red"
                                                        : "text-glacier-white/60"
                                                }`}
                                        >
                                            {stat.changeType === "positive" && <TrendingUp className="w-3 h-3" />}
                                            {stat.changeType === "negative" && <TrendingDown className="w-3 h-3" />}
                                            {stat.change}
                                        </div>
                                    )}

                                    {/* Expanded info on hover */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: hoveredCard === stat.id ? "auto" : 0,
                                            opacity: hoveredCard === stat.id ? 1 : 0,
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-glacier-white/70 mt-3 pt-3 border-t border-glacier-white/10">
                                            {stat.description}
                                        </p>
                                        <p className="text-xs text-glacier-white/50 mt-2">
                                            Source: {stat.source}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Ice Loss Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-glacier-white/5 rounded-2xl p-6 border border-glacier-white/10"
                    >
                        <h3 className="text-xl font-bold mb-2">Ice Loss by Decade</h3>
                        <p className="text-sm text-glacier-white/60 mb-6">Billions of tons lost per year (average)</p>

                        <div className="space-y-4">
                            {iceLossData.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <span className="w-16 text-sm text-glacier-white/70">{item.label}</span>
                                    <div className="flex-1 h-8 bg-glacier-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.value / 300) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                    <span className="w-16 text-right font-bold">{item.value} Gt</span>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-xs text-glacier-white/50 mt-4">Source: NASA GRACE satellite data</p>
                    </motion.div>

                    {/* Resource Distribution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-glacier-white/5 rounded-2xl p-6 border border-glacier-white/10"
                    >
                        <h3 className="text-xl font-bold mb-2">Mineral Resource Distribution</h3>
                        <p className="text-sm text-glacier-white/60 mb-6">Estimated value by resource type</p>

                        {/* Pie chart visualization */}
                        <div className="flex items-center gap-8">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                    {resourceData.reduce(
                                        (acc, item, index) => {
                                            const startAngle = acc.total;
                                            const angle = (item.value / 100) * 360;
                                            const endAngle = startAngle + angle;
                                            const largeArc = angle > 180 ? 1 : 0;

                                            const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                                            const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                                            const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                                            const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                                            acc.paths.push(
                                                <motion.path
                                                    key={index}
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                                                    d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                                                    fill={item.color}
                                                    stroke="rgba(10, 36, 99, 0.8)"
                                                    strokeWidth="1"
                                                />
                                            );
                                            acc.total = endAngle;
                                            return acc;
                                        },
                                        { paths: [] as React.ReactNode[], total: 0 }
                                    ).paths}
                                </svg>
                            </div>

                            <div className="flex-1 space-y-2">
                                {resourceData.map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm">{item.label}</span>
                                        <span className="ml-auto font-bold">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-glacier-white/50 mt-4">Source: USGS Mineral Resources</p>
                    </motion.div>
                </div>

                {/* Data Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-glacier-white/5 rounded-2xl p-8 border border-glacier-white/10"
                >
                    <h3 className="text-xl font-bold mb-6 text-center">Primary Data Sources</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {dataSources.map((source) => (
                            <a
                                key={source.name}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl bg-glacier-white/5 hover:bg-glacier-white/10 border border-glacier-white/10 hover:border-glacier-white/30 transition-all group"
                            >
                                <span className="text-2xl">{source.icon}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{source.name}</p>
                                    <p className="text-xs text-glacier-white/50">View source</p>
                                </div>
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-16 text-center"
                >
                    <p className="text-glacier-white/60 mb-4">Want to explore more?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/story">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-xl bg-glacier-white text-deep-navy font-bold flex items-center gap-2"
                            >
                                📖 Read the Story
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </a>
                        <a href="/games">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-xl bg-glacier-white/10 border border-glacier-white/20 font-bold hover:bg-glacier-white/20 transition-colors flex items-center gap-2"
                            >
                                🎮 Play the Games
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
