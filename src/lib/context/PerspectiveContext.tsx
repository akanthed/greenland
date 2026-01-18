"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Perspective types matching the design spec
export type PerspectiveType = "usa" | "greenland" | "climate" | "economic";

export interface PerspectiveInfo {
    id: PerspectiveType;
    label: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

// SVG Flags
const USAFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 741 390" className="w-full h-full">
        <rect width="741" height="390" fill="#fff" />
        <path d="M0 0h741v30H0zm0 60h741v30H0zm0 120h741v30H0zm0 60h741v30H0zm0 60h741v30H0zm0 60h741v30H0z" fill="#b22234" />
        <rect width="296.4" height="210" fill="#3c3b6e" />
        <g fill="#fff">
            <rect x="25" y="20" width="5" height="5" />
            <rect x="75" y="20" width="5" height="5" />
            <rect x="125" y="20" width="5" height="5" />
            <rect x="175" y="20" width="5" height="5" />
            <rect x="225" y="20" width="5" height="5" />
            <rect x="50" y="45" width="5" height="5" />
            <rect x="100" y="45" width="5" height="5" />
            <rect x="150" y="45" width="5" height="5" />
            <rect x="200" y="45" width="5" height="5" />
            <rect x="250" y="45" width="5" height="5" />
        </g>
    </svg>
);

const GreenlandFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12" className="w-full h-full">
        <path fill="#fff" d="M0 0h18v6H0z" />
        <path fill="#d00" d="M0 6h18v6H0z" />
        <path fill="#d00" d="M7 6a3 3 0 1 0-6 0h6z" />
        <path fill="#fff" d="M1 6a3 3 0 1 0 6 0H1z" />
    </svg>
);

// Perspective definitions
export const perspectives: Record<PerspectiveType, PerspectiveInfo> = {
    usa: {
        id: "usa",
        label: "USA Strategic",
        icon: <USAFlag />,
        description: "View through American strategic and military interests",
        color: "#3B82F6",
    },
    greenland: {
        id: "greenland",
        label: "Greenland Voice",
        icon: <GreenlandFlag />,
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
