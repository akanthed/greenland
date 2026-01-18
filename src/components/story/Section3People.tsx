"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote } from "lucide-react";

interface Section3Props {
    sectionIndex: number;
}

interface PersonProfile {
    id: string;
    name: string;
    role: string;
    age: number;
    location: string;
    image: string;
    emoji: string;
    quote: string;
    story: string;
    perspective: string;
}

const profiles: PersonProfile[] = [
    {
        id: "naja",
        name: "Naja Lyberth",
        role: "Cultural Activist",
        age: 35,
        location: "Nuuk",
        image: "/images/people/naja.jpg",
        emoji: "👩‍🎨",
        quote: "Our identity is not for sale. We are Kalaallit first.",
        story: "Naja leads initiatives to preserve Greenlandic language and culture. She fights against the erasure of indigenous identity in political discussions about Greenland's future.",
        perspective: "Independence is essential but must happen on our terms, preserving our culture and connection to the land.",
    },
    {
        id: "malik",
        name: "Malik Olsen",
        role: "Fisherman",
        age: 52,
        location: "Ilulissat",
        image: "/images/people/malik.jpg",
        emoji: "🎣",
        quote: "The ice used to be predictable. Now even the fish are confused.",
        story: "For three generations, Malik's family has fished these waters. Climate change has disrupted migration patterns and made traditional knowledge less reliable.",
        perspective: "We need economic independence, but not at the cost of destroying what makes this land worth living on.",
    },
    {
        id: "sofia",
        name: "Sofia Petersen",
        role: "Mining Engineer",
        age: 28,
        location: "Kuannersuit",
        image: "/images/people/sofia.jpg",
        emoji: "⛏️",
        quote: "Mining could give us freedom. Or it could take everything.",
        story: "Sofia works on environmental assessments for potential mining sites. She sees both the economic potential and environmental risks firsthand.",
        perspective: "We can develop responsibly, but only if Greenlanders control the process and profits.",
    },
    {
        id: "arne",
        name: "Arne Kristiansen",
        role: "Elder & Historian",
        age: 71,
        location: "Tasiilaq",
        image: "/images/people/arne.jpg",
        emoji: "👴",
        quote: "When Trump offered to buy us, I laughed. Then I realized he was serious.",
        story: "Arne has witnessed Greenland's transformation from isolated colony to autonomous nation on the brink of independence. He provides historical context to current debates.",
        perspective: "We've been 'owned' before. Never again. Our children must decide their own future.",
    },
    {
        id: "niviaq",
        name: "Niviaq Sørensen",
        role: "University Student",
        age: 22,
        location: "Nuuk/Copenhagen",
        image: "/images/people/niviaq.jpg",
        emoji: "🎓",
        quote: "My generation will decide. The world should listen to us, not talk about us.",
        story: "Niviaq studies political science and splits time between Greenland and Denmark. She represents the young generation navigating dual identities.",
        perspective: "We want independence but also global partnership. The world is changing. We can lead, not just follow.",
    },
    {
        id: "peter",
        name: "Peter Rosing",
        role: "Tourism Operator",
        age: 45,
        location: "Kangerlussuaq",
        image: "/images/people/peter.jpg",
        emoji: "🏔️",
        quote: "Everyone wants to see the ice before it's gone. That's beautiful and tragic.",
        story: "Peter runs adventure tours across Greenland. He's seen tourism grow dramatically as climate awareness increases, bringing both opportunities and challenges.",
        perspective: "Sustainable tourism can fund our future without destroying it. We just need to control the narrative.",
    },
];

export default function Section3People({ sectionIndex }: Section3Props) {
    const [selectedPerson, setSelectedPerson] = useState<PersonProfile | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-environment-green/20 via-deep-navy to-deep-navy text-glacier-white py-24 px-6 flex flex-col items-center justify-center">
            <div className="section-container max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm uppercase tracking-widest text-environment-green mb-4 block">
                        Section 03
                    </span>
                    <h2 className="text-page-title font-heading mb-4">The People</h2>
                    <p className="text-body-large text-glacier-white/80 max-w-2xl mx-auto">
                        <span className="font-bold text-environment-green">56,000 voices</span> are
                        often missing from the conversation about Greenland&apos;s future. Here are some of them.
                    </p>
                </motion.div>

                {/* Population Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {[
                        { value: "88%", label: "Inuit/Greenlandic" },
                        { value: "12%", label: "Danish/European" },
                        { value: "17,000", label: "Live in Nuuk" },
                        { value: "70%", label: "Support Independence" },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="text-center p-4 bg-glacier-white/5 rounded-xl"
                        >
                            <p className="text-2xl md:text-3xl font-bold text-environment-green">
                                {stat.value}
                            </p>
                            <p className="text-sm text-glacier-white/70 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* People Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((person, index) => (
                        <motion.button
                            key={person.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedPerson(person)}
                            className="group relative bg-glacier-white/5 hover:bg-glacier-white/10 rounded-2xl p-6 text-left transition-all border border-glacier-white/10 hover:border-environment-green/50"
                        >
                            {/* Avatar */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-environment-green to-deep-navy flex items-center justify-center text-3xl flex-shrink-0">
                                    {person.emoji}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{person.name}</h3>
                                    <p className="text-sm text-glacier-white/70">{person.role}</p>
                                    <p className="text-xs text-glacier-white/50 mt-1">
                                        {person.age} years • {person.location}
                                    </p>
                                </div>
                            </div>

                            {/* Quote preview */}
                            <div className="relative">
                                <Quote className="w-4 h-4 text-environment-green/50 absolute -left-1 -top-1" />
                                <p className="text-sm text-glacier-white/80 italic pl-4 line-clamp-2">
                                    &ldquo;{person.quote}&rdquo;
                                </p>
                            </div>

                            {/* Play indicator */}
                            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-environment-green/20 group-hover:bg-environment-green flex items-center justify-center transition-colors">
                                <Play className="w-4 h-4 text-glacier-white" />
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedPerson && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark-slate/90"
                            onClick={() => setSelectedPerson(null)}
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
                                    onClick={() => setSelectedPerson(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-glacier-white/10 hover:bg-glacier-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Profile header */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-environment-green to-deep-navy flex items-center justify-center text-5xl flex-shrink-0">
                                        {selectedPerson.emoji}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{selectedPerson.name}</h3>
                                        <p className="text-environment-green">{selectedPerson.role}</p>
                                        <p className="text-sm text-glacier-white/60">
                                            {selectedPerson.age} years old • {selectedPerson.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Main quote */}
                                <div className="bg-glacier-white/5 rounded-2xl p-6 mb-6">
                                    <Quote className="w-6 h-6 text-environment-green mb-2" />
                                    <p className="text-xl italic">&ldquo;{selectedPerson.quote}&rdquo;</p>
                                </div>

                                {/* Story */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-lg mb-2">Their Story</h4>
                                    <p className="text-glacier-white/80 leading-relaxed">
                                        {selectedPerson.story}
                                    </p>
                                </div>

                                {/* Perspective */}
                                <div className="bg-environment-green/10 border border-environment-green/30 rounded-xl p-4">
                                    <h4 className="font-bold text-environment-green mb-2">
                                        On Greenland&apos;s Future:
                                    </h4>
                                    <p className="text-glacier-white/90">{selectedPerson.perspective}</p>
                                </div>

                                {/* Video placeholder */}
                                <div className="mt-6 aspect-video bg-glacier-white/5 rounded-xl flex items-center justify-center border border-glacier-white/10">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-full bg-environment-green/20 flex items-center justify-center mx-auto mb-3">
                                            <Play className="w-8 h-8 text-glacier-white" />
                                        </div>
                                        <p className="text-glacier-white/60 text-sm">
                                            Video interview coming soon
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-glacier-white/70 mb-4">
                        These are just six stories. There are 56,000 more.
                    </p>
                    <p className="text-lg font-medium text-environment-green">
                        Any decision about Greenland must include Greenlandic voices.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
