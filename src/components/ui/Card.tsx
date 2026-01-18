"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    variant?: "default" | "glass" | "stat" | "game" | "perspective";
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
    default: "bg-glacier-white border border-border-gray",
    glass: "glass-card",
    stat: "bg-glacier-white border-l-4",
    game: "bg-gradient-to-br shadow-xl",
    perspective: "glass-card",
};

const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

export function Card({
    children,
    variant = "default",
    className = "",
    onClick,
    hover = true,
    padding = "md",
}: CardProps) {
    const isClickable = !!onClick;

    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
            whileTap={isClickable ? { scale: 0.99 } : undefined}
            onClick={onClick}
            className={`
        rounded-2xl transition-shadow duration-300
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? "hover:shadow-xl" : ""}
        ${isClickable ? "cursor-pointer" : ""}
        ${className}
      `}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
        >
            {children}
        </motion.div>
    );
}

// Stat Card Component
interface StatCardProps {
    value: string | number;
    label: string;
    sublabel?: string;
    color?: "blue" | "red" | "green" | "gold";
    icon?: React.ReactNode;
}

const colorBorders = {
    blue: "border-info",
    red: "border-urgent-red",
    green: "border-environment-green",
    gold: "border-resource-gold",
};

export function StatCard({ value, label, sublabel, color = "blue", icon }: StatCardProps) {
    return (
        <Card variant="stat" className={`${colorBorders[color]} min-h-[180px]`}>
            <div className="flex flex-col h-full">
                {icon && <div className="mb-4 text-3xl">{icon}</div>}
                <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-4xl font-bold text-dark-slate font-heading"
                    style={{ color: `var(--${color === "blue" ? "info" : color === "red" ? "urgent-red" : color === "green" ? "environment-green" : "resource-gold"})` }}
                >
                    {value}
                </motion.p>
                <p className="text-lg text-dark-slate mt-2 font-medium">{label}</p>
                {sublabel && <p className="text-sm text-cool-gray mt-1">{sublabel}</p>}
            </div>
        </Card>
    );
}

// Game Card Component
interface GameCardProps {
    title: string;
    description: string;
    icon: string;
    duration: string;
    players?: string;
    gradient: string;
    onClick?: () => void;
}

export function GameCard({
    title,
    description,
    icon,
    duration,
    players,
    gradient,
    onClick,
}: GameCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        ${gradient}
        rounded-3xl p-8 cursor-pointer
        min-h-[400px] flex flex-col
        shadow-lg hover:shadow-2xl transition-shadow
      `}
        >
            <motion.span
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="text-6xl mb-6"
            >
                {icon}
            </motion.span>
            <h3 className="text-2xl font-bold text-glacier-white font-heading mb-4">
                {title}
            </h3>
            <p className="text-glacier-white/80 flex-1 line-clamp-4">
                {description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-glacier-white/70">
                <span>⏱️ {duration}</span>
                {players && <span>👥 {players}</span>}
            </div>
            <button className="mt-6 w-full py-4 rounded-xl bg-glacier-white text-deep-navy font-bold hover:bg-arctic-ice transition-colors">
                Play Now →
            </button>
        </motion.div>
    );
}
