"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Download, ExternalLink } from "lucide-react";

interface Section8Props {
    sectionIndex: number;
}

const tabs = [
    { id: "climate", label: "Climate", emoji: "🌡️" },
    { id: "economy", label: "Economy", emoji: "💰" },
    { id: "demographics", label: "Demographics", emoji: "👥" },
    { id: "politics", label: "Politics", emoji: "🏛️" },
];

// Climate data
const temperatureData = [
    { year: 1980, temp: -1.2 },
    { year: 1990, temp: -0.8 },
    { year: 2000, temp: -0.3 },
    { year: 2010, temp: 0.5 },
    { year: 2020, temp: 1.1 },
    { year: 2024, temp: 1.5 },
];

const iceLossData = [
    { period: "1990s", loss: 34 },
    { period: "2000s", loss: 215 },
    { period: "2010s", loss: 286 },
    { period: "2020s", loss: 267 },
];

// Economy data
const gdpData = [
    { year: 2015, gdp: 2.4 },
    { year: 2016, gdp: 2.5 },
    { year: 2017, gdp: 2.7 },
    { year: 2018, gdp: 2.9 },
    { year: 2019, gdp: 3.0 },
    { year: 2020, gdp: 2.8 },
    { year: 2021, gdp: 3.1 },
    { year: 2022, gdp: 3.2 },
    { year: 2023, gdp: 3.3 },
];

const economySectors = [
    { name: "Fishing", value: 90, color: "#3B82F6" },
    { name: "Public Sector", value: 35, color: "#10B981" },
    { name: "Danish Grants", value: 30, color: "#EF4444" },
    { name: "Tourism", value: 15, color: "#F59E0B" },
    { name: "Mining", value: 5, color: "#8B5CF6" },
];

// Demographics data
const populationData = [
    { year: 1950, population: 25000 },
    { year: 1970, population: 47000 },
    { year: 1990, population: 56000 },
    { year: 2010, population: 57000 },
    { year: 2024, population: 56500 },
];

const ethnicityData = [
    { name: "Greenlandic Inuit", value: 88, color: "#10B981" },
    { name: "Danish/European", value: 11, color: "#EF4444" },
    { name: "Other", value: 1, color: "#6B7280" },
];

// Politics data
const independencePolls = [
    { year: 2008, support: 58, oppose: 32 },
    { year: 2012, support: 62, oppose: 28 },
    { year: 2016, support: 67, oppose: 23 },
    { year: 2020, support: 70, oppose: 20 },
    { year: 2024, support: 72, oppose: 18 },
];

export default function Section8Data({ sectionIndex }: Section8Props) {
    const [activeTab, setActiveTab] = useState("climate");

    const renderTabContent = () => {
        switch (activeTab) {
            case "climate":
                return (
                    <div className="space-y-8">
                        {/* Temperature Chart */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">
                                Arctic Temperature Anomaly (°C above 1900 baseline)
                            </h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={temperatureData}>
                                        <defs>
                                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                        <XAxis dataKey="year" stroke="#ffffff80" />
                                        <YAxis stroke="#ffffff80" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="temp"
                                            stroke="#FF6B35"
                                            fill="url(#tempGradient)"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-sm text-glacier-white/60 mt-4">
                                Source: NOAA Arctic Report Card 2024
                            </p>
                        </div>

                        {/* Ice Loss Chart */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">
                                Ice Sheet Mass Loss by Decade (Gigatonnes/year)
                            </h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={iceLossData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                        <XAxis dataKey="period" stroke="#ffffff80" />
                                        <YAxis stroke="#ffffff80" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Bar dataKey="loss" fill="#60A5FA" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-sm text-glacier-white/60 mt-4">
                                Source: NASA GRACE satellite data
                            </p>
                        </div>
                    </div>
                );

            case "economy":
                return (
                    <div className="space-y-8">
                        {/* GDP Chart */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">GDP (Billion USD)</h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={gdpData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                        <XAxis dataKey="year" stroke="#ffffff80" />
                                        <YAxis stroke="#ffffff80" domain={[2, 4]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="gdp"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            dot={{ fill: "#10B981", strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Economy Sectors */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">Economy by Sector (%)</h4>
                            <div className="h-64 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={economySectors}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label={({ name, value }) => `${name}: ${value}%`}
                                        >
                                            {economySectors.map((entry) => (
                                                <Cell key={entry.name} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-sm text-glacier-white/60 mt-4">
                                Note: Danish block grants account for ~50% of government revenue
                            </p>
                        </div>
                    </div>
                );

            case "demographics":
                return (
                    <div className="space-y-8">
                        {/* Population Chart */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">Population Over Time</h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={populationData}>
                                        <defs>
                                            <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                        <XAxis dataKey="year" stroke="#ffffff80" />
                                        <YAxis stroke="#ffffff80" domain={[0, 70000]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="population"
                                            stroke="#10B981"
                                            fill="url(#popGradient)"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Ethnicity */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">Ethnic Composition</h4>
                            <div className="space-y-4">
                                {ethnicityData.map((item) => (
                                    <div key={item.name}>
                                        <div className="flex justify-between mb-1">
                                            <span>{item.name}</span>
                                            <span className="font-bold">{item.value}%</span>
                                        </div>
                                        <div className="h-3 bg-glacier-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "politics":
                return (
                    <div className="space-y-8">
                        {/* Independence Support */}
                        <div className="bg-glacier-white/5 rounded-2xl p-6">
                            <h4 className="font-bold text-lg mb-4">
                                Support for Independence Over Time (%)
                            </h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={independencePolls}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                        <XAxis dataKey="year" stroke="#ffffff80" />
                                        <YAxis stroke="#ffffff80" domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#0A2463",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="support"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            name="Support"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="oppose"
                                            stroke="#EF4444"
                                            strokeWidth={3}
                                            name="Oppose"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-sm text-glacier-white/60 mt-4">
                                Source: Various polling organizations, 2008-2024
                            </p>
                        </div>

                        {/* Key Political Facts */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Next Election", value: "April 2025", icon: "🗳️" },
                                { title: "Current PM", value: "Múte B. Egede", icon: "👤" },
                                { title: "Parliamentary Seats", value: "31", icon: "🏛️" },
                                { title: "Political Parties", value: "6 Active", icon: "⚖️" },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="bg-glacier-white/5 rounded-xl p-4 flex items-center gap-4"
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <p className="text-sm text-glacier-white/60">{item.title}</p>
                                        <p className="font-bold">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-info/20 via-deep-navy to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-info mb-4 block">
                        Section 08
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Data</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        Explore the numbers behind the story with interactive charts and
                        primary source data.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                    ? "bg-info text-glacier-white"
                                    : "bg-glacier-white/10 hover:bg-glacier-white/20"
                                }`}
                        >
                            <span>{tab.emoji}</span>
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>

                {/* Download & Sources */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-wrap justify-center gap-4"
                >
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-glacier-white/10 hover:bg-glacier-white/20 transition-colors">
                        <Download className="w-5 h-5" />
                        Download Dataset
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-glacier-white/10 hover:bg-glacier-white/20 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        View All Sources
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
