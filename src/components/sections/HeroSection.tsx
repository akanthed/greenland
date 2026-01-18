"use client";

import React, { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";
import { FloatingParticles } from "@/components/shared/FloatingParticles";

// 3D Earth Globe Component
function EarthGlobe() {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation
            meshRef.current.rotation.y += 0.002;
        }
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Earth sphere */}
            <mesh ref={meshRef}>
                <Sphere args={[2, 64, 64]}>
                    <meshStandardMaterial
                        color="#1a5fb4"
                        roughness={0.8}
                        metalness={0.2}
                    />
                </Sphere>
            </mesh>

            {/* Ice caps */}
            <mesh rotation={[0, 0, 0]}>
                <Sphere args={[2.01, 32, 32]} scale={[1, 0.3, 1]} position={[0, 1.7, 0]}>
                    <meshStandardMaterial color="#E8F4F8" roughness={0.5} />
                </Sphere>
            </mesh>

            {/* Greenland highlight */}
            <mesh position={[0.8, 1.2, 1.2]}>
                <Sphere args={[0.3, 16, 16]}>
                    <meshStandardMaterial
                        color="#10B981"
                        emissive="#10B981"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            </mesh>

            {/* Atmosphere glow */}
            <mesh>
                <Sphere args={[2.15, 32, 32]}>
                    <meshStandardMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.1}
                        side={THREE.BackSide}
                    />
                </Sphere>
            </mesh>
        </group>
    );
}

// Loading fallback
function GlobeLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-deep-navy to-info opacity-50 animate-pulse" />
        </div>
    );
}

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden gradient-hero"
        >
            {/* 3D Earth Canvas */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<GlobeLoader />}>
                    <Canvas
                        camera={{ position: [0, 0, 6], fov: 45 }}
                        style={{ background: "transparent" }}
                    >
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
                        <EarthGlobe />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.5}
                            maxPolarAngle={Math.PI / 1.5}
                            minPolarAngle={Math.PI / 3}
                        />
                    </Canvas>
                </Suspense>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/70 via-deep-navy/40 to-deep-navy/90 z-10" />

            {/* Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
            >
                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-hero text-glacier-white font-heading max-w-4xl"
                >
                    GREENLAND
                    <span className="block text-page-title text-arctic-ice opacity-90">
                        THE UNTOLD STORY
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-body-large text-glacier-white/90 mt-6 max-w-2xl"
                >
                    <span className="font-bold">82% ice.</span>{" "}
                    <span className="font-bold">$280T minerals.</span>{" "}
                    <span className="font-bold">56,000 people.</span>
                    <br />
                    <span className="text-arctic-ice">Who owns the future?</span>
                </motion.p>

                {/* Stats ticker */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 mt-10"
                >
                    {[
                        { value: "2.16M", label: "km² of land" },
                        { value: "105B", label: "tonnes ice lost (2025)" },
                        { value: "$280T+", label: "in rare earth minerals" },
                        { value: "29th", label: "year of ice shrinkage" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="px-6 py-3 rounded-full bg-glacier-white/10 backdrop-blur-sm border border-glacier-white/20"
                        >
                            <span className="font-bold text-glacier-white">{stat.value}</span>
                            <span className="text-glacier-white/70 ml-2 text-sm">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap gap-4 mt-10"
                >
                    <a
                        href="/story"
                        className="btn btn-primary btn-lg"
                    >
                        Start the Journey
                    </a>
                    <a
                        href="/games"
                        className="btn border-2 border-glacier-white text-glacier-white hover:bg-glacier-white hover:text-deep-navy btn-lg transition-all duration-300"
                    >
                        Play the Games
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="scroll-indicator text-glacier-white"
            >
                <span className="text-sm font-medium opacity-70">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6 opacity-70" />
                </motion.div>
            </motion.div>

            {/* Floating particles decoration */}
            <FloatingParticles
                count={30}
                colors={["#E8F4F8", "#3B82F6", "#10B981", "#8B5CF6"]}
            />
        </section>
    );
}
