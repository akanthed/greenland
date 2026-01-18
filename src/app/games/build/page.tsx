"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Share2,
    RotateCcw,
    ArrowLeft,
    Trash2,
    Download,
    Map,
    Wind,
    Factory,
    Building2,
    Trees,
    Anchor,
    Plane,
    GraduationCap,
    Hospital,
    ShieldCheck,
    Tent,
    Fish,
    Sparkles,
} from "lucide-react";

// Types
interface PlacedItem {
    id: string;
    type: string;
    x: number;
    y: number;
    emoji: string;
    name: string;
}

interface BuildingType {
    id: string;
    name: string;
    emoji: string;
    icon: React.ReactNode;
    category: "infrastructure" | "economy" | "environment" | "social";
    description: string;
    effects: {
        economy: number;
        environment: number;
        population: number;
    };
    cost: number;
}

// Available building types
const buildingTypes: BuildingType[] = [
    {
        id: "wind-farm",
        name: "Wind Farm",
        emoji: "🌬️",
        icon: <Wind className="w-5 h-5" />,
        category: "environment",
        description: "Clean energy generation",
        effects: { economy: 10, environment: 20, population: 5 },
        cost: 100,
    },
    {
        id: "mining-site",
        name: "Mining Site",
        emoji: "⛏️",
        icon: <Factory className="w-5 h-5" />,
        category: "economy",
        description: "Extract rare earth minerals",
        effects: { economy: 30, environment: -25, population: 15 },
        cost: 200,
    },
    {
        id: "research-station",
        name: "Research Station",
        emoji: "🔬",
        icon: <Building2 className="w-5 h-5" />,
        category: "social",
        description: "Climate and Arctic research",
        effects: { economy: 15, environment: 15, population: 10 },
        cost: 150,
    },
    {
        id: "protected-area",
        name: "Protected Area",
        emoji: "🌲",
        icon: <Trees className="w-5 h-5" />,
        category: "environment",
        description: "Wildlife sanctuary",
        effects: { economy: -5, environment: 30, population: 5 },
        cost: 50,
    },
    {
        id: "port",
        name: "Arctic Port",
        emoji: "⚓",
        icon: <Anchor className="w-5 h-5" />,
        category: "infrastructure",
        description: "Shipping and trade hub",
        effects: { economy: 25, environment: -10, population: 20 },
        cost: 250,
    },
    {
        id: "airport",
        name: "Airport",
        emoji: "✈️",
        icon: <Plane className="w-5 h-5" />,
        category: "infrastructure",
        description: "Connect to the world",
        effects: { economy: 20, environment: -5, population: 15 },
        cost: 180,
    },
    {
        id: "university",
        name: "University",
        emoji: "🎓",
        icon: <GraduationCap className="w-5 h-5" />,
        category: "social",
        description: "Higher education center",
        effects: { economy: 10, environment: 0, population: 25 },
        cost: 200,
    },
    {
        id: "hospital",
        name: "Hospital",
        emoji: "🏥",
        icon: <Hospital className="w-5 h-5" />,
        category: "social",
        description: "Healthcare facility",
        effects: { economy: 5, environment: 0, population: 30 },
        cost: 150,
    },
    {
        id: "military-base",
        name: "Military Base",
        emoji: "🛡️",
        icon: <ShieldCheck className="w-5 h-5" />,
        category: "infrastructure",
        description: "Defense installation",
        effects: { economy: 15, environment: -15, population: 10 },
        cost: 300,
    },
    {
        id: "eco-resort",
        name: "Eco Resort",
        emoji: "🏕️",
        icon: <Tent className="w-5 h-5" />,
        category: "economy",
        description: "Sustainable tourism",
        effects: { economy: 20, environment: 5, population: 15 },
        cost: 120,
    },
    {
        id: "fishing-village",
        name: "Fishing Village",
        emoji: "🐟",
        icon: <Fish className="w-5 h-5" />,
        category: "economy",
        description: "Traditional fishing community",
        effects: { economy: 15, environment: -5, population: 20 },
        cost: 80,
    },
    {
        id: "cultural-center",
        name: "Cultural Center",
        emoji: "🎭",
        icon: <Sparkles className="w-5 h-5" />,
        category: "social",
        description: "Preserve Inuit heritage",
        effects: { economy: 5, environment: 0, population: 20 },
        cost: 100,
    },
];

// Greenland regions for placement hints
const regions = [
    { name: "Nuuk", x: 35, y: 75, description: "Capital city" },
    { name: "Ilulissat", x: 45, y: 55, description: "UNESCO site" },
    { name: "Thule", x: 55, y: 15, description: "Northern base" },
    { name: "Tasiilaq", x: 70, y: 65, description: "East coast hub" },
    { name: "Sisimiut", x: 40, y: 60, description: "Second largest city" },
    { name: "Kangerlussuaq", x: 45, y: 62, description: "Main airport" },
];

const categoryColors: Record<string, string> = {
    infrastructure: "#3B82F6",
    economy: "#F59E0B",
    environment: "#22C55E",
    social: "#8B5CF6",
};

export default function MapCreator() {
    const [gamePhase, setGamePhase] = useState<"intro" | "building" | "result">("intro");
    const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
    const [budget, setBudget] = useState(1000);
    const [showCategory, setShowCategory] = useState<string | null>(null);
    const [mapName, setMapName] = useState("");
    const mapRef = useRef<HTMLDivElement>(null);

    const calculateStats = () => {
        return placedItems.reduce(
            (acc, item) => {
                const building = buildingTypes.find((b) => b.id === item.type);
                if (building) {
                    acc.economy += building.effects.economy;
                    acc.environment += building.effects.environment;
                    acc.population += building.effects.population;
                }
                return acc;
            },
            { economy: 0, environment: 0, population: 0 }
        );
    };

    const startGame = () => {
        setPlacedItems([]);
        setBudget(1000);
        setSelectedBuilding(null);
        setMapName("");
        setGamePhase("building");
    };

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectedBuilding || !mapRef.current) return;
        if (budget < selectedBuilding.cost) return;

        const rect = mapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Don't place outside the map shape (simple bounds check)
        if (x < 10 || x > 90 || y < 5 || y > 95) return;

        const newItem: PlacedItem = {
            id: `${selectedBuilding.id}-${Date.now()}`,
            type: selectedBuilding.id,
            x,
            y,
            emoji: selectedBuilding.emoji,
            name: selectedBuilding.name,
        };

        setPlacedItems([...placedItems, newItem]);
        setBudget((prev) => prev - selectedBuilding.cost);
    };

    const removeItem = (id: string) => {
        const item = placedItems.find((i) => i.id === id);
        if (item) {
            const building = buildingTypes.find((b) => b.id === item.type);
            if (building) {
                setBudget((prev) => prev + Math.floor(building.cost * 0.5)); // 50% refund
            }
        }
        setPlacedItems(placedItems.filter((i) => i.id !== id));
    };

    const clearMap = () => {
        setPlacedItems([]);
        setBudget(1000);
    };

    const finishMap = () => {
        if (placedItems.length === 0) return;
        setGamePhase("result");
    };

    const getVisionTitle = () => {
        const stats = calculateStats();
        if (stats.environment > stats.economy && stats.environment > 50) {
            return { title: "The Green Arctic", emoji: "🌿", description: "A haven for nature and sustainability" };
        }
        if (stats.economy > stats.environment && stats.economy > 50) {
            return { title: "The Arctic Powerhouse", emoji: "💎", description: "An economic force in the Arctic" };
        }
        if (stats.population > 100) {
            return { title: "The People's Greenland", emoji: "👥", description: "A thriving community for all" };
        }
        return { title: "The Balanced Future", emoji: "⚖️", description: "A careful balance of priorities" };
    };

    const shareResult = () => {
        const stats = calculateStats();
        const vision = getVisionTitle();
        const text = `🗺️ I designed Greenland's future in Map Creator!\n\n${vision.emoji} "${mapName || vision.title}"\n\n📊 My Vision:\n💰 Economy: +${stats.economy}\n🌿 Environment: ${stats.environment >= 0 ? "+" : ""}${stats.environment}\n👥 Population: +${stats.population}\n🏗️ ${placedItems.length} developments placed\n\nCreate your own vision!`;

        if (navigator.share) {
            navigator.share({ title: "My Greenland Map", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    };

    const filteredBuildings = showCategory
        ? buildingTypes.filter((b) => b.category === showCategory)
        : buildingTypes;

    return (
        <div className="min-h-screen pt-20 gradient-game-build text-glacier-white">
            <div className="section-container py-12 px-6">
                <AnimatePresence mode="wait">
                    {/* INTRO SCREEN */}
                    {gamePhase === "intro" && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-8xl block mb-8"
                            >
                                🗺️
                            </motion.span>

                            <h1 className="text-hero font-heading mb-6">Map Creator</h1>
                            <p className="text-2xl text-arctic-ice mb-4">Design Greenland&apos;s Future</p>
                            <p className="text-body-large text-glacier-white/80 max-w-xl mx-auto mb-8">
                                You have $1,000M to invest. Place developments on the map to create your vision
                                for Greenland in 2050. Balance economy, environment, and population.
                            </p>

                            {/* Building categories preview */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {[
                                    { cat: "infrastructure", icon: <Building2 />, label: "Infrastructure" },
                                    { cat: "economy", icon: <Factory />, label: "Economy" },
                                    { cat: "environment", icon: <Trees />, label: "Environment" },
                                    { cat: "social", icon: <GraduationCap />, label: "Social" },
                                ].map((item) => (
                                    <div
                                        key={item.cat}
                                        className="bg-glacier-white/10 rounded-xl p-4 text-center"
                                        style={{ borderLeft: `4px solid ${categoryColors[item.cat]}` }}
                                    >
                                        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <p className="font-bold text-sm">{item.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Building count */}
                            <p className="text-glacier-white/60 mb-8">
                                12 unique developments to place
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-12 py-5 rounded-2xl bg-glacier-white text-deep-navy font-bold text-xl hover:bg-arctic-ice transition-colors"
                            >
                                <Map className="inline-block mr-2 w-6 h-6" />
                                Start Building
                            </motion.button>

                            <p className="text-sm text-glacier-white/50 mt-6">⏱️ Takes 5-10 minutes</p>
                        </motion.div>
                    )}

                    {/* BUILDING SCREEN */}
                    {gamePhase === "building" && (
                        <motion.div
                            key="building"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-6xl mx-auto"
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">Design Your Greenland</h2>
                                    <p className="text-glacier-white/60">Click on the map to place developments</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-resource-gold/20 px-4 py-2 rounded-xl">
                                        <p className="text-sm text-glacier-white/60">Budget</p>
                                        <p className="text-xl font-bold text-resource-gold">${budget}M</p>
                                    </div>
                                    <button
                                        onClick={clearMap}
                                        className="p-3 rounded-xl bg-urgent-red/20 text-urgent-red hover:bg-urgent-red/30 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={finishMap}
                                        disabled={placedItems.length === 0}
                                        className={`px-6 py-3 rounded-xl font-bold ${placedItems.length === 0
                                                ? "bg-glacier-white/20 text-glacier-white/50 cursor-not-allowed"
                                                : "bg-glacier-white text-deep-navy"
                                            }`}
                                    >
                                        Finish Map →
                                    </motion.button>
                                </div>
                            </div>

                            {/* Live Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-glacier-white/10 rounded-xl p-3 text-center">
                                    <p className="text-sm text-glacier-white/60">Economy</p>
                                    <p className={`text-xl font-bold ${calculateStats().economy >= 0 ? "text-success" : "text-urgent-red"}`}>
                                        {calculateStats().economy >= 0 ? "+" : ""}{calculateStats().economy}
                                    </p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-3 text-center">
                                    <p className="text-sm text-glacier-white/60">Environment</p>
                                    <p className={`text-xl font-bold ${calculateStats().environment >= 0 ? "text-success" : "text-urgent-red"}`}>
                                        {calculateStats().environment >= 0 ? "+" : ""}{calculateStats().environment}
                                    </p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-3 text-center">
                                    <p className="text-sm text-glacier-white/60">Population</p>
                                    <p className="text-xl font-bold text-success">
                                        +{calculateStats().population}
                                    </p>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Map Area */}
                                <div className="lg:col-span-2">
                                    <div
                                        ref={mapRef}
                                        onClick={handleMapClick}
                                        className={`relative aspect-[4/5] bg-gradient-to-b from-arctic-ice/20 to-deep-navy/50 rounded-3xl overflow-hidden border-2 ${selectedBuilding
                                                ? "border-glacier-white cursor-crosshair"
                                                : "border-glacier-white/30"
                                            }`}
                                    >
                                        {/* Simplified Greenland Shape */}
                                        <svg
                                            viewBox="0 0 100 100"
                                            className="absolute inset-0 w-full h-full"
                                            preserveAspectRatio="xMidYMid meet"
                                        >
                                            {/* Greenland outline - simplified */}
                                            <path
                                                d="M40,5 L60,5 L70,15 L75,30 L70,50 L75,65 L65,85 L50,95 L35,90 L25,75 L20,60 L25,40 L20,25 L30,10 Z"
                                                fill="rgba(255,255,255,0.1)"
                                                stroke="rgba(255,255,255,0.3)"
                                                strokeWidth="0.5"
                                            />
                                            {/* Ice sheet */}
                                            <path
                                                d="M35,20 L55,18 L60,35 L58,55 L50,70 L40,65 L32,45 L30,30 Z"
                                                fill="rgba(232,244,248,0.2)"
                                                stroke="none"
                                            />
                                        </svg>

                                        {/* Region markers */}
                                        {regions.map((region) => (
                                            <div
                                                key={region.name}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                                            >
                                                <div className="w-2 h-2 bg-glacier-white/50 rounded-full" />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-deep-navy/90 px-2 py-1 rounded text-xs">
                                                    {region.name}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Placed items */}
                                        {placedItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeItem(item.id);
                                                }}
                                            >
                                                <span className="text-2xl drop-shadow-lg">{item.emoji}</span>
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-deep-navy/90 px-2 py-1 rounded text-xs">
                                                    {item.name} (click to remove)
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Selected building preview */}
                                        {selectedBuilding && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-deep-navy/90 px-4 py-2 rounded-xl text-sm">
                                                Placing: {selectedBuilding.emoji} {selectedBuilding.name} (${selectedBuilding.cost}M)
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Building Palette */}
                                <div className="space-y-4">
                                    {/* Category filters */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setShowCategory(null)}
                                            className={`px-3 py-1 rounded-full text-sm ${showCategory === null
                                                    ? "bg-glacier-white text-deep-navy"
                                                    : "bg-glacier-white/20"
                                                }`}
                                        >
                                            All
                                        </button>
                                        {Object.entries(categoryColors).map(([cat, color]) => (
                                            <button
                                                key={cat}
                                                onClick={() => setShowCategory(cat === showCategory ? null : cat)}
                                                className={`px-3 py-1 rounded-full text-sm capitalize ${showCategory === cat
                                                        ? "bg-glacier-white text-deep-navy"
                                                        : "bg-glacier-white/20"
                                                    }`}
                                                style={{ borderColor: color }}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Buildings list */}
                                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                        {filteredBuildings.map((building) => (
                                            <motion.button
                                                key={building.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedBuilding(building)}
                                                disabled={budget < building.cost}
                                                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${selectedBuilding?.id === building.id
                                                        ? "border-glacier-white bg-glacier-white/20"
                                                        : budget < building.cost
                                                            ? "border-glacier-white/10 opacity-50 cursor-not-allowed"
                                                            : "border-glacier-white/20 hover:border-glacier-white/50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{building.emoji}</span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-bold text-sm">{building.name}</p>
                                                            <span className="text-xs text-resource-gold">${building.cost}M</span>
                                                        </div>
                                                        <p className="text-xs text-glacier-white/60">{building.description}</p>
                                                        <div className="flex gap-2 mt-1 text-xs">
                                                            <span className={building.effects.economy >= 0 ? "text-success" : "text-urgent-red"}>
                                                                💰{building.effects.economy >= 0 ? "+" : ""}{building.effects.economy}
                                                            </span>
                                                            <span className={building.effects.environment >= 0 ? "text-success" : "text-urgent-red"}>
                                                                🌿{building.effects.environment >= 0 ? "+" : ""}{building.effects.environment}
                                                            </span>
                                                            <span className="text-success">
                                                                👥+{building.effects.population}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {gamePhase === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-9xl mb-4"
                            >
                                {getVisionTitle().emoji}
                            </motion.div>

                            <h1 className="text-hero font-heading mb-2">{getVisionTitle().title}</h1>
                            <p className="text-xl text-arctic-ice mb-4">{getVisionTitle().description}</p>

                            {/* Name your map */}
                            <div className="bg-glacier-white/10 rounded-xl p-4 mb-8 max-w-md mx-auto">
                                <label className="text-sm text-glacier-white/60 block mb-2">Name your vision (optional)</label>
                                <input
                                    type="text"
                                    value={mapName}
                                    onChange={(e) => setMapName(e.target.value)}
                                    placeholder="e.g., 'Green Arctic 2050'"
                                    className="w-full px-4 py-2 rounded-lg bg-glacier-white/10 border border-glacier-white/20 text-glacier-white placeholder:text-glacier-white/40 focus:outline-none focus:border-glacier-white/50"
                                />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <p className="text-4xl font-bold text-resource-gold">
                                        {calculateStats().economy >= 0 ? "+" : ""}{calculateStats().economy}
                                    </p>
                                    <p className="text-sm text-glacier-white/60">Economy Impact</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <p className={`text-4xl font-bold ${calculateStats().environment >= 0 ? "text-success" : "text-urgent-red"}`}>
                                        {calculateStats().environment >= 0 ? "+" : ""}{calculateStats().environment}
                                    </p>
                                    <p className="text-sm text-glacier-white/60">Environment Impact</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <p className="text-4xl font-bold text-arctic-ice">
                                        +{calculateStats().population}
                                    </p>
                                    <p className="text-sm text-glacier-white/60">Population Growth</p>
                                </div>
                            </div>

                            {/* Placed items summary */}
                            <div className="bg-glacier-white/5 rounded-xl p-6 mb-8">
                                <h3 className="font-bold mb-4">Your Developments ({placedItems.length})</h3>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {placedItems.map((item) => (
                                        <span
                                            key={item.id}
                                            className="px-3 py-1 rounded-full bg-glacier-white/10 text-sm"
                                        >
                                            {item.emoji} {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Budget used */}
                            <div className="text-glacier-white/60 mb-8">
                                Budget used: <strong className="text-resource-gold">${1000 - budget}M</strong> of $1,000M
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={shareResult}
                                    className="px-8 py-4 rounded-xl bg-glacier-white text-deep-navy font-bold flex items-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share Vision
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="px-8 py-4 rounded-xl bg-glacier-white/10 border border-glacier-white/30 font-bold flex items-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Create New Map
                                </motion.button>
                            </div>

                            <Link
                                href="/games"
                                className="inline-flex items-center gap-2 text-glacier-white/60 hover:text-glacier-white mt-8 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Games
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
