"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        // Removed unused variants object


        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-bold",
            xl: "px-10 py-5 text-xl font-bold uppercase tracking-wider",
        };

        // Brutalist shadow styles
        const shadowClass =
            variant === "primary" || variant === "secondary"
                ? "shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-200"
                : "";

        // For primary (lime), shadow is white or black depending on bg? 
        // Actually brutalist usually uses black shadow on light elements, or white on dark.
        // Our bg is black. So shadows should perhaps be white or accent.
        // Let's refine the shadow logic.

        const brutalShadow = cn(
            "border-2 border-white", // Default border
            variant === "primary" && "bg-accent border-accent shadow-[4px_4px_0px_0px_#ffffff] text-black hover:bg-accent/90", // Fixed: Added bg-accent
            variant === "secondary" && "bg-white border-white text-black shadow-[4px_4px_0px_0px_#BFFF00] hover:bg-gray-200",
            variant === "outline" && "bg-transparent border-white text-white shadow-[4px_4px_0px_0px_#BFFF00] hover:bg-white hover:text-black",
            variant === "destructive" && "bg-red-600 border-red-600 shadow-[4px_4px_0px_0px_#ffffff] text-white hover:bg-red-700" // Fixed: Added bg-red-600
        );

        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider transition-all duration-200 outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                    brutalShadow,
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
