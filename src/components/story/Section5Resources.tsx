"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Diamond, Droplets, Zap, X } from "lucide-react";

interface Section5Props {
    sectionIndex: number;
}

interface Resource {
    id: string;
    name: string;
    type: "mineral" | "oil" | "uranium" | "rare-earth";
    location: string;
    coordinates: { lat: number; lng: number };
    value: string;
    status: string;
    details: string;
    controversy: string;
    icon: string;
}

const resources: Resource[] = [
    {
        id: "kvanefjeld",
        name: "Kvanefjeld (Kuannersuit)",
        type: "rare-earth",
        location: "Southern Greenland",
        coordinates: { lat: 60.9, lng: -45.9 },
        value: "$3-4 billion",
        status: "Controversial - local vote rejected",
        details: "One of world's largest deposits of rare earth elements, uranium, and zinc. Critical for green tech like wind turbines and EVs.",
        controversy: "Rejected by local referendum in 2021 due to uranium/radioactive waste concerns. Australian company Greenland Minerals still pursuing.",
        icon: "⚡",
    },
    {
        id: "isua",
        name: "Isua Iron Ore",
        type: "mineral",
        location: "Near Nuuk",
        coordinates: { lat: 65.2, lng: -49.8 },
        value: "$2.2 billion",
        status: "Development stalled",
        details: "Massive iron ore deposit. London Mining bankruptcy halted project. Chinese investors showed interest.",
        controversy: "Questions about environmental impact and who benefits from extraction.",
        icon: "🏔️",
    },
    {
        id: "citronen",
        name: "Citronen Fjord",
        type: "mineral",
        location: "Far North Greenland",
        coordinates: { lat: 83.1, lng: -28.5 },
        value: "$700 million",
        status: "Exploration phase",
        details: "One of world's largest undeveloped zinc-lead deposits. Extremely remote location.",
        controversy: "Arctic ecosystem concerns and extraction logistics in harsh environment.",
        icon: "💎",
    },
    {
        id: "disko-nuussuaq",
        name: "Disko-Nuussuaq Basin",
        type: "oil",
        location: "Western Greenland",
        coordinates: { lat: 70.0, lng: -53.5 },
        value: "Billions (unproven)",
        status: "Exploration banned (2021)",
        details: "Potential offshore oil and gas reserves. Estimated 17 billion barrels possible.",
        controversy: "Greenland banned all oil exploration in 2021, prioritizing climate concerns over potential revenue.",
        icon: "🛢️",
    },
    {
        id: "ilimaussaq",
        name: "Ilímaussaq Complex",
        type: "rare-earth",
        location: "Southern Greenland",
        coordinates: { lat: 60.9, lng: -46.0 },
        value: "$10+ billion",
        status: "Various exploration stages",
        details: "Extraordinary geological formation with diverse mineral deposits including niobium, tantalum, rare earths.",
        controversy: "Overlaps with protected areas and indigenous land use.",
        icon: "🔬",
    },
];

const resourceColors = {
    mineral: "#6366F1",
    oil: "#1F2937",
    uranium: "#10B981",
    "rare-earth": "#F59E0B",
};

export default function Section5Resources({ sectionIndex }: Section5Props) {
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [filterType, setFilterType] = useState<string>("all");

    const filteredResources =
        filterType === "all"
            ? resources
            : resources.filter((r) => r.type === filterType);

    return (
        <div className="min-h-screen bg-gradient-to-b from-resource-gold/20 via-deep-navy to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-resource-gold mb-4 block">
                        Section 05
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The Resources</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        Beneath the ice lies an estimated{" "}
                        <span className="font-bold text-resource-gold">$280+ trillion</span>{" "}
                        in untapped minerals, including elements critical for the green energy transition.
                    </p>
                </motion.div>

                {/* Resource Value Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {[
                        { icon: "⚡", value: "25%", label: "World's Rare Earths" },
                        { icon: "💎", value: "13%", label: "Global Zinc Reserves" },
                        { icon: "🔬", value: "Top 5", label: "Uranium Deposits" },
                        { icon: "🏔️", value: "50+", label: "Active Mining Licenses" },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="text-center p-4 bg-glacier-white/5 rounded-xl"
                        >
                            <span className="text-2xl">{stat.icon}</span>
                            <p className="text-2xl font-bold text-resource-gold mt-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-glacier-white/70">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[
                        { id: "all", label: "All Resources", icon: "🗺️" },
                        { id: "rare-earth", label: "Rare Earth", icon: "⚡" },
                        { id: "mineral", label: "Minerals", icon: "💎" },
                        { id: "oil", label: "Oil & Gas", icon: "🛢️" },
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setFilterType(filter.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${filterType === filter.id
                                    ? "bg-resource-gold text-deep-navy font-medium"
                                    : "bg-glacier-white/10 hover:bg-glacier-white/20"
                                }`}
                        >
                            <span>{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Interactive Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-deep-navy via-info/10 to-deep-navy rounded-3xl overflow-hidden border border-glacier-white/20"
                    style={{ minHeight: "400px" }}
                >
                    {/* Simplified Greenland Shape with Markers */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Greenland outline placeholder */}
                        <div className="relative w-64 h-80 md:w-80 md:h-96">
                            <div className="absolute inset-0 bg-glacier-white/10 rounded-[40%_60%_70%_30%/50%_40%_60%_50%]" />

                            {/* Resource markers */}
                            {filteredResources.map((resource, index) => {
                                // Simple positioning based on coordinates
                                const xPercent = ((resource.coordinates.lng + 60) / 40) * 100;
                                const yPercent = (1 - (resource.coordinates.lat - 55) / 35) * 100;

                                return (
                                    <motion.button
                                        key={resource.id}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.3 }}
                                        onClick={() => setSelectedResource(resource)}
                                        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-lg shadow-lg cursor-pointer"
                                        style={{
                                            left: `${Math.max(10, Math.min(90, xPercent))}%`,
                                            top: `${Math.max(10, Math.min(90, yPercent))}%`,
                                            backgroundColor: resourceColors[resource.type],
                                        }}
                                        title={resource.name}
                                    >
                                        {resource.icon}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-deep-navy/80 backdrop-blur rounded-lg p-3">
                        <p className="text-xs font-medium mb-2">Resource Types</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(resourceColors).map(([type, color]) => (
                                <div key={type} className="flex items-center gap-1">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-xs capitalize">{type.replace("-", " ")}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Resource List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {filteredResources.map((resource, index) => (
                        <motion.button
                            key={resource.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedResource(resource)}
                            className="flex items-start gap-4 p-4 bg-glacier-white/5 hover:bg-glacier-white/10 rounded-xl text-left transition-all border border-transparent hover:border-resource-gold/30"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{ backgroundColor: resourceColors[resource.type] }}
                            >
                                {resource.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold truncate">{resource.name}</h4>
                                <p className="text-sm text-glacier-white/70">{resource.location}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm font-medium text-resource-gold">
                                        {resource.value}
                                    </span>
                                    <span className="text-xs text-glacier-white/50 truncate">
                                        {resource.status}
                                    </span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Resource Detail Modal */}
                <AnimatePresence>
                    {selectedResource && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark-slate/90"
                            onClick={() => setSelectedResource(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-deep-navy rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedResource(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-glacier-white/10 hover:bg-glacier-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                                        style={{ backgroundColor: resourceColors[selectedResource.type] }}
                                    >
                                        {selectedResource.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{selectedResource.name}</h3>
                                        <p className="text-glacier-white/70">{selectedResource.location}</p>
                                    </div>
                                </div>

                                {/* Value & Status */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-resource-gold/10 border border-resource-gold/30 rounded-xl p-4">
                                        <p className="text-sm text-glacier-white/60">Estimated Value</p>
                                        <p className="text-2xl font-bold text-resource-gold">
                                            {selectedResource.value}
                                        </p>
                                    </div>
                                    <div className="bg-glacier-white/5 rounded-xl p-4">
                                        <p className="text-sm text-glacier-white/60">Status</p>
                                        <p className="font-medium">{selectedResource.status}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mb-6">
                                    <h4 className="font-bold mb-2">About This Resource</h4>
                                    <p className="text-glacier-white/80">{selectedResource.details}</p>
                                </div>

                                {/* Controversy */}
                                <div className="bg-urgent-red/10 border border-urgent-red/30 rounded-xl p-4">
                                    <h4 className="font-bold text-urgent-red mb-2">⚠️ Key Issues</h4>
                                    <p className="text-glacier-white/80">{selectedResource.controversy}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Key insight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-lg text-glacier-white/80">
                        <span className="font-bold text-resource-gold">The paradox:</span>{" "}
                        Mining these resources could fund independence, but extraction conflicts
                        with environmental values and local wishes.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
