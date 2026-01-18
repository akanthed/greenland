"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
}

// Individual scroll reveal component
export function ScrollReveal({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 60,
    once = true,
}: ScrollRevealProps) {
    const getInitialState = () => {
        switch (direction) {
            case "up": return { opacity: 0, y: distance };
            case "down": return { opacity: 0, y: -distance };
            case "left": return { opacity: 0, x: distance };
            case "right": return { opacity: 0, x: -distance };
            case "scale": return { opacity: 0, scale: 0.8 };
            case "fade":
            default: return { opacity: 0 };
        }
    };

    const getAnimateState = () => {
        switch (direction) {
            case "up":
            case "down": return { opacity: 1, y: 0 };
            case "left":
            case "right": return { opacity: 1, x: 0 };
            case "scale": return { opacity: 1, scale: 1 };
            case "fade":
            default: return { opacity: 1 };
        }
    };

    return (
        <motion.div
            className={className}
            initial={getInitialState()}
            whileInView={getAnimateState()}
            viewport={{ once, margin: "-100px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // Negative = slower than scroll, Positive = faster
}

// Parallax scrolling effect
export function ParallaxSection({ children, className = "", speed = 0.5 }: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    );
}

interface ScrollProgressBarProps {
    color?: string;
    height?: string;
    position?: "top" | "bottom";
}

// Section progress bar
export function SectionProgressBar({ color = "#10B981", height = "3px", position = "top" }: ScrollProgressBarProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    return (
        <div
            ref={ref}
            className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-16" : "bottom-0"}`}
        >
            <motion.div
                className="h-full origin-left"
                style={{
                    scaleX: scrollYProgress,
                    height,
                    backgroundColor: color,
                }}
            />
        </div>
    );
}

interface NumberCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

// Animated number counter that triggers on scroll
export function NumberCounter({ value, suffix = "", prefix = "", duration = 2, className = "" }: NumberCounterProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const springValue = useSpring(
        useTransform(scrollYProgress, [0, 0.5], [0, value]),
        { stiffness: 100, damping: 30, duration }
    );

    return (
        <motion.span ref={ref} className={className}>
            {prefix}
            <motion.span>
                {springValue.get().toFixed(0)}
            </motion.span>
            {suffix}
        </motion.span>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    viewportMargin?: string;
}

// Container that staggers its children animations
export function StaggerContainer({ children, className = "", staggerDelay = 0.1, viewportMargin = "-100px" }: StaggerContainerProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants}>{child}</motion.div>
            ))}
        </motion.div>
    );
}

interface TextRevealProps {
    text: string;
    className?: string;
    highlightColor?: string;
    triggerOnce?: boolean;
}

// Text that reveals word by word on scroll
export function TextReveal({ text, className = "", highlightColor, triggerOnce = true }: TextRevealProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    return (
        <p ref={ref} className={`flex flex-wrap gap-x-2 ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word
                        key={i}
                        progress={scrollYProgress}
                        range={[start, end]}
                        highlightColor={highlightColor}
                    >
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

function Word({
    children,
    progress,
    range,
    highlightColor,
}: {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    highlightColor?: string;
}) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const color = useTransform(
        progress,
        range,
        highlightColor ? ["rgba(255,255,255,0.2)", highlightColor] : ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]
    );

    return (
        <motion.span style={{ opacity, color }} className="inline-block">
            {children}
        </motion.span>
    );
}

interface FadeInSectionProps {
    children: ReactNode;
    className?: string;
    threshold?: number;
}

// Simple fade-in section
export function FadeInSection({ children, className = "", threshold = 0.3 }: FadeInSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, threshold, 1 - threshold, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, threshold, 1 - threshold, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ opacity, scale }}
        >
            {children}
        </motion.div>
    );
}

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

// Horizontal scroll within vertical scroll
export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
