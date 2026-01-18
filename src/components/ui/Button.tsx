"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
    variant?: "primary" | "secondary" | "game" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const variants = {
    primary: "bg-deep-navy text-glacier-white hover:bg-medium-navy",
    secondary: "bg-transparent text-deep-navy border-2 border-deep-navy hover:bg-deep-navy hover:text-glacier-white",
    game: "bg-gradient-to-r from-game-purple to-purple-600 text-glacier-white hover:shadow-lg hover:shadow-purple-500/40",
    ghost: "bg-transparent text-cool-gray hover:bg-light-bg hover:text-dark-slate",
};

const sizes = {
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-11 px-6 text-base rounded-lg",
    lg: "h-14 px-8 text-lg rounded-xl",
    xl: "h-16 px-10 text-xl rounded-xl",
};

export function Button({
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "right",
    loading = false,
    fullWidth = false,
    children,
    className = "",
    disabled,
    onClick,
    type = "button",
}: ButtonProps) {
    return (
        <motion.button
            type={type}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <>
                    {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
                    {children}
                    {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
                </>
            )}
        </motion.button>
    );
}
