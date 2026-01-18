"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Share2,
    RotateCcw,
    ArrowLeft,
    Trophy,
    Clock,
    Zap,
    CheckCircle,
    XCircle,
    Brain,
} from "lucide-react";

// Types
interface Question {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    category: "geography" | "history" | "politics" | "climate" | "culture";
    difficulty: "easy" | "medium" | "hard";
    points: number;
}

// Question Bank - 15 questions (game uses 10 random ones)
const allQuestions: Question[] = [
    {
        id: 1,
        question: "What is the total area of Greenland?",
        options: ["836,330 km²", "1,566,086 km²", "2,166,086 km²", "3,287,263 km²"],
        correctIndex: 2,
        explanation: "Greenland covers 2,166,086 km², making it the world's largest island.",
        category: "geography",
        difficulty: "easy",
        points: 100,
    },
    {
        id: 2,
        question: "What percentage of Greenland is covered by ice?",
        options: ["About 60%", "About 72%", "About 82%", "About 91%"],
        correctIndex: 2,
        explanation: "Approximately 82% of Greenland is covered by the Greenland Ice Sheet.",
        category: "geography",
        difficulty: "easy",
        points: 100,
    },
    {
        id: 3,
        question: "When did Greenland gain Home Rule from Denmark?",
        options: ["1953", "1979", "1999", "2009"],
        correctIndex: 1,
        explanation: "Greenland gained Home Rule in 1979, establishing its own parliament.",
        category: "history",
        difficulty: "medium",
        points: 150,
    },
    {
        id: 4,
        question: "Who named Greenland and why?",
        options: [
            "Leif Erikson, because of green meadows",
            "Eric the Red, as a marketing ploy",
            "Danish explorers, for scientific purposes",
            "Inuit settlers, for religious reasons",
        ],
        correctIndex: 1,
        explanation: "Eric the Red named it 'Greenland' around 982 CE to attract settlers, despite it being mostly ice.",
        category: "history",
        difficulty: "medium",
        points: 150,
    },
    {
        id: 5,
        question: "What is Greenland's approximate population?",
        options: ["About 25,000", "About 56,000", "About 120,000", "About 250,000"],
        correctIndex: 1,
        explanation: "Greenland has a population of approximately 56,000 people.",
        category: "culture",
        difficulty: "easy",
        points: 100,
    },
    {
        id: 6,
        question: "Which country currently has sovereignty over Greenland?",
        options: ["Norway", "Iceland", "Denmark", "Canada"],
        correctIndex: 2,
        explanation: "Greenland is an autonomous territory within the Kingdom of Denmark.",
        category: "politics",
        difficulty: "easy",
        points: 100,
    },
    {
        id: 7,
        question: "In what year did US President Trump first propose buying Greenland?",
        options: ["2017", "2018", "2019", "2020"],
        correctIndex: 2,
        explanation: "Trump proposed purchasing Greenland in August 2019, which Denmark's PM called 'absurd'.",
        category: "politics",
        difficulty: "medium",
        points: 150,
    },
    {
        id: 8,
        question: "How much ice does Greenland lose per year on average (in gigatonnes)?",
        options: ["About 50 GT", "About 150 GT", "About 267 GT", "About 500 GT"],
        correctIndex: 2,
        explanation: "Greenland loses approximately 267 gigatonnes of ice per year due to climate change.",
        category: "climate",
        difficulty: "hard",
        points: 200,
    },
    {
        id: 9,
        question: "What is the capital and largest city of Greenland?",
        options: ["Ilulissat", "Sisimiut", "Nuuk", "Qaqortoq"],
        correctIndex: 2,
        explanation: "Nuuk is the capital and largest city with about 19,000 residents.",
        category: "geography",
        difficulty: "easy",
        points: 100,
    },
    {
        id: 10,
        question: "What percentage of Greenland's population is Inuit?",
        options: ["About 65%", "About 75%", "About 88%", "About 95%"],
        correctIndex: 2,
        explanation: "Approximately 88% of Greenland's population is Greenlandic Inuit.",
        category: "culture",
        difficulty: "medium",
        points: 150,
    },
    {
        id: 11,
        question: "Greenland left the European Economic Community (now EU) in what year?",
        options: ["1975", "1985", "1995", "2005"],
        correctIndex: 1,
        explanation: "Greenland left the EEC in 1985, becoming the first territory to do so, primarily over fishing rights.",
        category: "history",
        difficulty: "hard",
        points: 200,
    },
    {
        id: 12,
        question: "What is the estimated value of Greenland's untapped mineral resources?",
        options: ["$50 billion", "$150 billion", "$280 trillion", "$500 billion"],
        correctIndex: 2,
        explanation: "Greenland's mineral wealth, including rare earth elements, is estimated at over $280 trillion.",
        category: "geography",
        difficulty: "hard",
        points: 200,
    },
    {
        id: 13,
        question: "What major US military installation is located in Greenland?",
        options: ["Camp Lejeune", "Thule Air Base", "Ramstein Air Base", "Fort Greely"],
        correctIndex: 1,
        explanation: "Thule Air Base in northern Greenland is a key US Space Force installation.",
        category: "politics",
        difficulty: "medium",
        points: 150,
    },
    {
        id: 14,
        question: "If all of Greenland's ice melted, how much would global sea levels rise?",
        options: ["About 2 meters", "About 4 meters", "About 7 meters", "About 12 meters"],
        correctIndex: 2,
        explanation: "Complete melting of the Greenland Ice Sheet would raise sea levels by approximately 7 meters.",
        category: "climate",
        difficulty: "hard",
        points: 200,
    },
    {
        id: 15,
        question: "In what year did Greenland ban all future oil and gas exploration?",
        options: ["2015", "2018", "2021", "2023"],
        correctIndex: 2,
        explanation: "Greenland banned oil and gas exploration in 2021, prioritizing climate concerns.",
        category: "climate",
        difficulty: "medium",
        points: 150,
    },
];

// Shuffle and select questions
function getRandomQuestions(count: number): Question[] {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

const categoryEmojis: Record<string, string> = {
    geography: "🗺️",
    history: "📜",
    politics: "🏛️",
    climate: "🌡️",
    culture: "🎭",
};

const categoryColors: Record<string, string> = {
    geography: "#3B82F6",
    history: "#8B5CF6",
    politics: "#EF4444",
    climate: "#10B981",
    culture: "#F59E0B",
};

const QUESTION_TIME = 15; // seconds per question

export default function TriviaGame() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [timerActive, setTimerActive] = useState(false);

    const currentQuestion = questions[currentIndex];

    // Timer logic
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    const handleTimeout = useCallback(() => {
        if (isAnswered) return;
        setIsAnswered(true);
        setTimerActive(false);
        setStreak(0);
    }, [isAnswered]);

    const startGame = () => {
        const selectedQuestions = getRandomQuestions(10);
        setQuestions(selectedQuestions);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setMaxStreak(0);
        setCorrectCount(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(QUESTION_TIME);
        setTimerActive(true);
        setGameState("playing");
    };

    const handleAnswer = (answerIndex: number) => {
        if (isAnswered) return;

        setSelectedAnswer(answerIndex);
        setIsAnswered(true);
        setTimerActive(false);

        const isCorrect = answerIndex === currentQuestion.correctIndex;

        if (isCorrect) {
            // Calculate score with time bonus and streak bonus
            const timeBonus = Math.floor(timeLeft * 5);
            const streakMultiplier = Math.min(streak + 1, 5) * 0.1 + 1; // up to 1.5x
            const pointsEarned = Math.floor((currentQuestion.points + timeBonus) * streakMultiplier);

            setScore((prev) => prev + pointsEarned);
            setStreak((prev) => prev + 1);
            setMaxStreak((prev) => Math.max(prev, streak + 1));
            setCorrectCount((prev) => prev + 1);
        } else {
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setTimeLeft(QUESTION_TIME);
            setTimerActive(true);
        } else {
            setGameState("result");
        }
    };

    const resetGame = () => {
        setGameState("intro");
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setMaxStreak(0);
        setCorrectCount(0);
    };

    const shareResult = () => {
        const percentage = Math.round((correctCount / 10) * 100);
        const text = `🧠 I scored ${score} points in Greenland Trivia Challenge!\n\n✅ ${correctCount}/10 correct (${percentage}%)\n🔥 Max streak: ${maxStreak}\n\nCan you beat my score?`;

        if (navigator.share) {
            navigator.share({ title: "Greenland Trivia Challenge", text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    };

    const getGrade = () => {
        if (correctCount >= 9) return { grade: "A+", emoji: "🏆", message: "Greenland Expert!" };
        if (correctCount >= 8) return { grade: "A", emoji: "🥇", message: "Outstanding!" };
        if (correctCount >= 7) return { grade: "B", emoji: "🥈", message: "Great job!" };
        if (correctCount >= 6) return { grade: "C", emoji: "👍", message: "Good effort!" };
        if (correctCount >= 5) return { grade: "D", emoji: "📚", message: "Keep learning!" };
        return { grade: "F", emoji: "🔄", message: "Try again!" };
    };

    return (
        <div className="min-h-screen pt-20 gradient-game-trivia text-glacier-white">
            <div className="section-container py-12 px-6">
                <AnimatePresence mode="wait">
                    {/* INTRO SCREEN */}
                    {gameState === "intro" && (
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
                                🧠
                            </motion.span>

                            <h1 className="text-hero font-heading mb-6">Trivia Challenge</h1>
                            <p className="text-2xl text-arctic-ice mb-4">Test Your Greenland Knowledge</p>
                            <p className="text-body-large text-glacier-white/80 max-w-xl mx-auto mb-8">
                                10 questions on history, geography, politics, climate, and culture.
                                Answer fast for bonus points!
                            </p>

                            {/* Game rules */}
                            <div className="grid md:grid-cols-3 gap-4 mb-12">
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Clock className="w-8 h-8 mx-auto mb-2 text-resource-gold" />
                                    <p className="font-bold">15 Seconds</p>
                                    <p className="text-sm text-glacier-white/60">Per question</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Zap className="w-8 h-8 mx-auto mb-2 text-resource-gold" />
                                    <p className="font-bold">Streak Bonus</p>
                                    <p className="text-sm text-glacier-white/60">Up to 1.5x multiplier</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-xl p-4">
                                    <Trophy className="w-8 h-8 mx-auto mb-2 text-resource-gold" />
                                    <p className="font-bold">Leaderboard</p>
                                    <p className="text-sm text-glacier-white/60">High score: 1,920</p>
                                </div>
                            </div>

                            {/* Categories preview */}
                            <div className="flex flex-wrap justify-center gap-3 mb-8">
                                {Object.entries(categoryEmojis).map(([cat, emoji]) => (
                                    <div
                                        key={cat}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-glacier-white/10"
                                    >
                                        <span>{emoji}</span>
                                        <span className="capitalize text-sm">{cat}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-12 py-5 rounded-2xl bg-glacier-white text-deep-navy font-bold text-xl hover:bg-arctic-ice transition-colors"
                            >
                                <Brain className="inline-block mr-2 w-6 h-6" />
                                Start Quiz
                            </motion.button>

                            <p className="text-sm text-glacier-white/50 mt-6">⏱️ Takes 2-3 minutes</p>
                        </motion.div>
                    )}

                    {/* PLAYING SCREEN */}
                    {gameState === "playing" && currentQuestion && (
                        <motion.div
                            key={`q-${currentIndex}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-3xl mx-auto"
                        >
                            {/* Progress Bar & Stats */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                {/* Question count */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-glacier-white/60">Question</span>
                                    <span className="text-xl font-bold">
                                        {currentIndex + 1}
                                        <span className="text-glacier-white/50">/10</span>
                                    </span>
                                </div>

                                {/* Score and streak */}
                                <div className="flex gap-6">
                                    <div className="text-right">
                                        <p className="text-sm text-glacier-white/60">Score</p>
                                        <p className="text-xl font-bold text-resource-gold">{score}</p>
                                    </div>
                                    {streak > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-right"
                                        >
                                            <p className="text-sm text-glacier-white/60">Streak</p>
                                            <p className="text-xl font-bold text-urgent-red">🔥 {streak}</p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: categoryColors[currentQuestion.category] }}
                                        />
                                        {categoryEmojis[currentQuestion.category]}{" "}
                                        <span className="capitalize">{currentQuestion.category}</span>
                                    </span>
                                    <span
                                        className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-urgent-red" : "text-glacier-white"
                                            }`}
                                    >
                                        <Clock className="w-4 h-4" />
                                        {timeLeft}s
                                    </span>
                                </div>
                                <div className="h-2 bg-glacier-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-resource-gold to-urgent-red"
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className="bg-glacier-white/10 backdrop-blur rounded-3xl p-8 mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ backgroundColor: categoryColors[currentQuestion.category] }}
                                    >
                                        {currentQuestion.difficulty.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-glacier-white/60">
                                        +{currentQuestion.points} pts
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold mb-2">{currentQuestion.question}</h2>
                            </div>

                            {/* Answer Options */}
                            <div className="space-y-3 mb-6">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedAnswer === index;
                                    const isCorrect = index === currentQuestion.correctIndex;
                                    const showResult = isAnswered;

                                    let bgClass = "bg-glacier-white/10 hover:bg-glacier-white/20 border-glacier-white/20";
                                    if (showResult) {
                                        if (isCorrect) {
                                            bgClass = "bg-success/30 border-success";
                                        } else if (isSelected && !isCorrect) {
                                            bgClass = "bg-urgent-red/30 border-urgent-red";
                                        } else {
                                            bgClass = "bg-glacier-white/5 border-glacier-white/10 opacity-50";
                                        }
                                    }

                                    return (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={!isAnswered ? { scale: 1.01 } : {}}
                                            whileTap={!isAnswered ? { scale: 0.99 } : {}}
                                            onClick={() => handleAnswer(index)}
                                            disabled={isAnswered}
                                            className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between ${bgClass}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="w-10 h-10 rounded-full bg-glacier-white/10 flex items-center justify-center font-bold">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span className="font-medium">{option}</span>
                                            </div>
                                            {showResult && isCorrect && (
                                                <CheckCircle className="w-6 h-6 text-success" />
                                            )}
                                            {showResult && isSelected && !isCorrect && (
                                                <XCircle className="w-6 h-6 text-urgent-red" />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Explanation & Next Button */}
                            <AnimatePresence>
                                {isAnswered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        {/* Feedback */}
                                        <div
                                            className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion.correctIndex
                                                    ? "bg-success/20 border border-success/40"
                                                    : selectedAnswer === null
                                                        ? "bg-urgent-red/20 border border-urgent-red/40"
                                                        : "bg-urgent-red/20 border border-urgent-red/40"
                                                }`}
                                        >
                                            {selectedAnswer === currentQuestion.correctIndex ? (
                                                <p className="font-bold text-success flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Correct! {streak > 1 && `🔥 ${streak} streak!`}
                                                </p>
                                            ) : selectedAnswer === null ? (
                                                <p className="font-bold text-urgent-red flex items-center gap-2">
                                                    <Clock className="w-5 h-5" />
                                                    Time&apos;s up!
                                                </p>
                                            ) : (
                                                <p className="font-bold text-urgent-red flex items-center gap-2">
                                                    <XCircle className="w-5 h-5" />
                                                    Incorrect - Streak lost!
                                                </p>
                                            )}
                                            <p className="text-glacier-white/80 mt-2">
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>

                                        {/* Next button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={nextQuestion}
                                            className="w-full py-4 rounded-xl bg-glacier-white text-deep-navy font-bold text-lg hover:bg-arctic-ice transition-colors"
                                        >
                                            {currentIndex < 9 ? "Next Question →" : "See Results"}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {gameState === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Grade */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-9xl mb-4"
                            >
                                {getGrade().emoji}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="text-hero font-heading mb-2">{getGrade().grade}</h1>
                                <p className="text-2xl text-arctic-ice mb-2">{getGrade().message}</p>
                            </motion.div>

                            {/* Score breakdown */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-3 gap-4 my-8"
                            >
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <Trophy className="w-10 h-10 mx-auto mb-3 text-resource-gold" />
                                    <p className="text-4xl font-bold text-resource-gold">{score}</p>
                                    <p className="text-sm text-glacier-white/60">Total Score</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <CheckCircle className="w-10 h-10 mx-auto mb-3 text-success" />
                                    <p className="text-4xl font-bold text-success">
                                        {correctCount}
                                        <span className="text-xl text-glacier-white/50">/10</span>
                                    </p>
                                    <p className="text-sm text-glacier-white/60">Correct</p>
                                </div>
                                <div className="bg-glacier-white/10 rounded-2xl p-6">
                                    <Zap className="w-10 h-10 mx-auto mb-3 text-urgent-red" />
                                    <p className="text-4xl font-bold text-urgent-red">🔥 {maxStreak}</p>
                                    <p className="text-sm text-glacier-white/60">Max Streak</p>
                                </div>
                            </motion.div>

                            {/* Percentage bar */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-glacier-white/10 rounded-xl p-6 mb-8"
                            >
                                <p className="text-sm text-glacier-white/60 mb-2">Accuracy</p>
                                <div className="h-4 bg-glacier-white/20 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-urgent-red via-resource-gold to-success"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(correctCount / 10) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                    />
                                </div>
                                <p className="text-2xl font-bold">{Math.round((correctCount / 10) * 100)}%</p>
                            </motion.div>

                            {/* High score comparison */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="bg-resource-gold/20 border border-resource-gold/40 rounded-xl p-4 mb-8"
                            >
                                {score > 1500 ? (
                                    <p className="font-bold text-resource-gold">
                                        🎉 New Personal Best! You&apos;re in the top 10%
                                    </p>
                                ) : (
                                    <p className="text-glacier-white/80">
                                        🏆 High score to beat: <strong>1,920</strong> (top player)
                                    </p>
                                )}
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap justify-center gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={shareResult}
                                    className="px-8 py-4 rounded-xl bg-glacier-white text-deep-navy font-bold flex items-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share Score
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="px-8 py-4 rounded-xl bg-glacier-white/10 border border-glacier-white/30 font-bold flex items-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Play Again
                                </motion.button>
                            </motion.div>

                            {/* Back to games */}
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
