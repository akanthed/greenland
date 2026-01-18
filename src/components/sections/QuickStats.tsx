"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
    value: string;
    numericValue: number;
    suffix: string;
    label: string;
    sublabel: string;
    color: "blue" | "red" | "green" | "gold";
    category: string;
}

const stats: StatItem[] = [
    {
        value: "2.16M",
        numericValue: 2166086,
        suffix: " km²",
        label: "Total Area",
        sublabel: "World's largest island",
        color: "blue",
        category: "Geography",
    },
    {
        value: "56,000",
        numericValue: 56000,
        suffix: "",
        label: "Population",
        sublabel: "88% are Greenlandic Inuit",
        color: "green",
        category: "Demographics",
    },
    {
        value: "410,449",
        numericValue: 410449,
        suffix: " km³",
        label: "Ice Volume Lost",
        sublabel: "Per decade since 2010",
        color: "red",
        category: "Climate",
    },
    {
        value: "$280T+",
        numericValue: 280,
        suffix: "T+",
        label: "Mineral Wealth Est.",
        sublabel: "Inc. rare earth elements",
        color: "gold",
        category: "Economy",
    },
    {
        value: "-267",
        numericValue: 267,
        suffix: " GT/yr",
        label: "Ice Mass Loss Rate",
        sublabel: "Current annual average",
        color: "red",
        category: "Climate",
    },
    {
        value: "1979",
        numericValue: 1979,
        suffix: "",
        label: "Home Rule Granted",
        sublabel: "Path to self-governance",
        color: "blue",
        category: "Politics",
    },
];

// Animated counter hook - uses HTMLDivElement for the container
function useCounter(end: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(start + (end - start) * easeOutQuart));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [isInView, end, duration, start]);

    return { count, ref };
}

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
    const { count, ref } = useCounter(stat.numericValue);

    // Format the count based on the stat type
    const formatValue = () => {
        if (stat.value.includes("M")) {
            return (count / 1000000).toFixed(2) + "M";
        }
        if (stat.value.includes("T")) {
            return "$" + count + stat.suffix;
        }
        if (stat.value.startsWith("-")) {
            return "-" + count.toLocaleString();
        }
        return count.toLocaleString();
    };

    const borderColorClass =
        stat.color === "blue"
            ? "border-info"
            : stat.color === "red"
                ? "border-urgent-red"
                : stat.color === "green"
                    ? "border-environment-green"
                    : "border-resource-gold";

    const textColorClass =
        stat.color === "blue"
            ? "text-info"
            : stat.color === "red"
                ? "text-urgent-red"
                : stat.color === "green"
                    ? "text-environment-green"
                    : "text-resource-gold";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <div className={`card-stat border-l-4 ${borderColorClass}`}>
                <span className="text-xs uppercase tracking-wider text-cool-gray mb-2 block">
                    {stat.category}
                </span>
                <p className={`text-4xl md:text-5xl font-bold font-heading ${textColorClass}`}>
                    {formatValue()}
                    {stat.suffix &&
                        !stat.value.includes("T") &&
                        !stat.value.includes("M") && (
                            <span className="text-xl ml-1">{stat.suffix}</span>
                        )}
                </p>
                <p className="text-lg text-dark-slate mt-3 font-medium">{stat.label}</p>
                <p className="text-sm text-cool-gray mt-1">{stat.sublabel}</p>
            </div>
        </motion.div>
    );
}

export function QuickStats() {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-b from-light-bg to-glacier-white">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-section-heading text-dark-slate font-heading mb-4">
                        By The Numbers
                    </h2>
                    <p className="text-body-large text-cool-gray max-w-2xl mx-auto">
                        Understand the scale of Greenland through key statistics
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <AnimatedStat key={stat.label} stat={stat} index={index} />
                    ))}
                </div>

                {/* Source note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-caption text-cool-gray mt-12"
                >
                    Sources: NASA, Statistics Greenland, USGS, NOAA Arctic Report 2024
                </motion.p>
            </div>
        </section>
    );
}
