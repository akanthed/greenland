"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

interface FloatingParticlesProps {
    count?: number;
    colors?: string[];
    className?: string;
}

export function FloatingParticles({
    count = 20,
    colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#E8F4F8"],
    className = "",
}: FloatingParticlesProps) {
    // Generate particles only on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const generated = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(generated);
    }, [count, colors]);

    // Don't render anything on server or before mount
    if (!isMounted) {
        return null;
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        opacity: 0.3,
                    }}
                    animate={{
                        y: [0, -100, -200, -100, 0],
                        x: [0, 20, -10, 30, 0],
                        opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
                        scale: [1, 1.2, 0.8, 1.1, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
