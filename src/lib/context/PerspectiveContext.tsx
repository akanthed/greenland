"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Perspective types matching the design spec
export type PerspectiveType = "usa" | "greenland" | "climate" | "economic";

export interface PerspectiveInfo {
    id: PerspectiveType;
    label: string;
    icon: string;
    description: string;
    color: string;
}

// Perspective definitions
export const perspectives: Record<PerspectiveType, PerspectiveInfo> = {
    usa: {
        id: "usa",
        label: "USA Strategic",
        icon: "🇺🇸",
        description: "View through American strategic and military interests",
        color: "#3B82F6",
    },
    greenland: {
        id: "greenland",
        label: "Greenland Voice",
        icon: "🇬🇱",
        description: "The perspective of Greenlandic people and self-determination",
        color: "#10B981",
    },
    climate: {
        id: "climate",
        label: "Climate Crisis",
        icon: "🌍",
        description: "Focus on environmental impact and climate change",
        color: "#FF6B35",
    },
    economic: {
        id: "economic",
        label: "Economic Value",
        icon: "💰",
        description: "Emphasis on resources, trade, and economic potential",
        color: "#F4A259",
    },
};

interface PerspectiveContextType {
    currentPerspective: PerspectiveType;
    setPerspective: (perspective: PerspectiveType) => void;
    perspectiveInfo: PerspectiveInfo;
    allPerspectives: PerspectiveInfo[];
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(
    undefined
);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
    const [currentPerspective, setCurrentPerspective] =
        useState<PerspectiveType>("greenland");

    const setPerspective = (perspective: PerspectiveType) => {
        setCurrentPerspective(perspective);
        // Could add localStorage persistence here
        if (typeof window !== "undefined") {
            localStorage.setItem("greenland-perspective", perspective);
        }
    };

    // Initialize from localStorage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem("greenland-perspective") as PerspectiveType;
        if (saved && perspectives[saved]) {
            setCurrentPerspective(saved);
        }
    }, []);

    const value: PerspectiveContextType = {
        currentPerspective,
        setPerspective,
        perspectiveInfo: perspectives[currentPerspective],
        allPerspectives: Object.values(perspectives),
    };

    return (
        <PerspectiveContext.Provider value={value}>
            {children}
        </PerspectiveContext.Provider>
    );
}

export function usePerspective() {
    const context = useContext(PerspectiveContext);
    if (context === undefined) {
        throw new Error("usePerspective must be used within a PerspectiveProvider");
    }
    return context;
}
