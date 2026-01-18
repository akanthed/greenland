"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

// Animated Earth that zooms from space to Greenland
function AnimatedEarth({ phase, onZoomComplete }: { phase: "space" | "zooming" | "focused"; onZoomComplete: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    const targetPosition = useRef({ x: 0, y: 0, z: 15 });
    const currentPosition = useRef({ x: 0, y: 0, z: 15 });

    useEffect(() => {
        if (phase === "space") {
            targetPosition.current = { x: 0, y: 0, z: 15 };
        } else if (phase === "zooming") {
            // Zoom to Greenland position (northwest)
            targetPosition.current = { x: 0.8, y: 1.2, z: 4 };
        } else if (phase === "focused") {
            targetPosition.current = { x: 0.8, y: 1.2, z: 3.5 };
        }
    }, [phase]);

    useFrame((state, delta) => {
        // Smooth camera movement
        const lerpFactor = phase === "zooming" ? 0.02 : 0.05;
        currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor;
        currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor;
        currentPosition.current.z += (targetPosition.current.z - currentPosition.current.z) * lerpFactor;

        camera.position.set(currentPosition.current.x, currentPosition.current.y, currentPosition.current.z);
        camera.lookAt(0, 0, 0);

        // Check if zoom is complete
        if (phase === "zooming") {
            const distance = Math.abs(currentPosition.current.z - targetPosition.current.z);
            if (distance < 0.5) {
                onZoomComplete();
            }
        }

        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Earth sphere with realistic texture effect */}
            <mesh ref={meshRef}>
                <Sphere args={[2, 128, 128]}>
                    <meshStandardMaterial
                        color="#1a5fb4"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </Sphere>
            </mesh>

            {/* Land masses (simplified) */}
            {/* North America */}
            <mesh rotation={[0.1, 0.5, 0]}>
                <Sphere args={[2.01, 32, 32]} scale={[0.5, 0.4, 0.1]} position={[-0.5, 0.5, 1.7]}>
                    <meshStandardMaterial color="#2d5016" roughness={0.8} />
                </Sphere>
            </mesh>

            {/* Europe */}
            <mesh>
                <Sphere args={[2.01, 32, 32]} scale={[0.3, 0.25, 0.1]} position={[0.8, 0.6, 1.6]}>
                    <meshStandardMaterial color="#2d5016" roughness={0.8} />
                </Sphere>
            </mesh>

            {/* North Ice Cap */}
            <mesh>
                <Sphere args={[2.02, 32, 32]} scale={[1, 0.25, 1]} position={[0, 1.9, 0]}>
                    <meshStandardMaterial color="#E8F4F8" roughness={0.4} />
                </Sphere>
            </mesh>

            {/* South Ice Cap */}
            <mesh>
                <Sphere args={[2.02, 32, 32]} scale={[1, 0.2, 1]} position={[0, -1.95, 0]}>
                    <meshStandardMaterial color="#E8F4F8" roughness={0.4} />
                </Sphere>
            </mesh>

            {/* GREENLAND - Main highlight with pulsing glow */}
            <mesh position={[0.5, 1.4, 1.3]}>
                <Sphere args={[0.35, 32, 32]}>
                    <meshStandardMaterial
                        color="#E8F4F8"
                        roughness={0.5}
                    />
                </Sphere>
            </mesh>

            {/* Greenland glow effect */}
            <mesh position={[0.5, 1.4, 1.3]}>
                <Sphere args={[0.4, 32, 32]}>
                    <meshStandardMaterial
                        color="#10B981"
                        transparent
                        opacity={phase === "focused" ? 0.6 : 0.3}
                        emissive="#10B981"
                        emissiveIntensity={phase === "focused" ? 1 : 0.5}
                    />
                </Sphere>
            </mesh>

            {/* Greenland label - appears when focused */}
            {phase === "focused" && (
                <Html position={[0.8, 1.8, 1.3]} center>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="whitespace-nowrap bg-deep-navy/90 backdrop-blur px-4 py-2 rounded-full border border-glacier-white/30"
                    >
                        <span className="text-glacier-white font-bold">🇬🇱 GREENLAND</span>
                    </motion.div>
                </Html>
            )}

            {/* Atmosphere glow */}
            <mesh>
                <Sphere args={[2.2, 32, 32]}>
                    <meshStandardMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.08}
                        side={THREE.BackSide}
                    />
                </Sphere>
            </mesh>
        </group>
    );
}

// Loading fallback
function IntroLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-deep-navy to-info opacity-50 animate-pulse mx-auto" />
                <p className="text-glacier-white/60 mt-4">Loading Earth...</p>
            </motion.div>
        </div>
    );
}

interface EarthIntroProps {
    onComplete: () => void;
    skipEnabled?: boolean;
}

export function EarthIntro({ onComplete, skipEnabled = true }: EarthIntroProps) {
    const [phase, setPhase] = useState<"space" | "zooming" | "focused" | "complete">("space");
    const [showText, setShowText] = useState(0);
    const [showSkip, setShowSkip] = useState(false);

    // Text sequence
    const textSequence = [
        { text: "In the Arctic Ocean...", delay: 1000 },
        { text: "lies the world's largest island", delay: 2500 },
        { text: "2.16 million km² of ice and mystery", delay: 4000 },
    ];

    useEffect(() => {
        // Show skip button after 1 second
        const skipTimer = setTimeout(() => setShowSkip(true), 1000);

        // Start text sequence
        const textTimers = textSequence.map((item, index) =>
            setTimeout(() => setShowText(index + 1), item.delay)
        );

        // Start zoom after text sequence
        const zoomTimer = setTimeout(() => {
            setPhase("zooming");
        }, 5500);

        return () => {
            clearTimeout(skipTimer);
            textTimers.forEach(t => clearTimeout(t));
            clearTimeout(zoomTimer);
        };
    }, []);

    const handleZoomComplete = () => {
        setPhase("focused");
        // Wait a moment before completing
        setTimeout(() => {
            setPhase("complete");
            onComplete();
        }, 2000);
    };

    const handleSkip = () => {
        setPhase("complete");
        onComplete();
    };

    if (phase === "complete") {
        return null;
    }

    // At this point, phase is narrowed to exclude "complete" due to early return above
    // So we use phase directly which is now "space" | "zooming" | "focused"

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-deep-navy"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Stars background */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>

            {/* Earth Canvas */}
            <div className="absolute inset-0">
                <Suspense fallback={<IntroLoader />}>
                    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[10, 10, 10]} intensity={1} />
                        <directionalLight position={[-5, -5, -5]} intensity={0.2} />
                        <AnimatedEarth phase={phase} onZoomComplete={handleZoomComplete} />
                    </Canvas>
                </Suspense>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                    {phase === "space" && showText > 0 && (
                        <motion.div
                            key="intro-text"
                            className="text-center space-y-4"
                        >
                            {textSequence.slice(0, showText).map((item, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className={`text-glacier-white ${index === 0 ? 'text-2xl md:text-4xl font-heading' : 'text-lg md:text-2xl opacity-80'}`}
                                >
                                    {item.text}
                                </motion.p>
                            ))}
                        </motion.div>
                    )}

                    {phase === "zooming" && (
                        <motion.div
                            key="zooming-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-40 left-1/2 -translate-x-1/2"
                        >
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-glacier-white text-xl font-medium"
                            >
                                Approaching Greenland...
                            </motion.p>
                        </motion.div>
                    )}

                    {phase === "focused" && (
                        <motion.div
                            key="focused-text"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-heading text-glacier-white mb-4">
                                GREENLAND
                            </h1>
                            <p className="text-xl text-arctic-ice">
                                The Untold Story
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Skip Button - phase can't be "complete" here due to early return */}
            {skipEnabled && showSkip && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleSkip}
                    className="absolute bottom-8 right-8 px-6 py-2 rounded-full bg-glacier-white/10 hover:bg-glacier-white/20 text-glacier-white text-sm border border-glacier-white/30 transition-all pointer-events-auto"
                >
                    Skip Intro →
                </motion.button>
            )}

            {/* Progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {["space", "zooming", "focused"].map((p) => (
                    <div
                        key={p}
                        className={`w-2 h-2 rounded-full transition-all ${phase === p
                            ? "bg-glacier-white"
                            : "bg-glacier-white/30"
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}
