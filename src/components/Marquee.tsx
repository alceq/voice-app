"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    text: string;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
    repeat?: number;
}

export function Marquee({
    text,
    speed = 20,
    direction = "left",
    className,
    repeat = 4,
}: MarqueeProps) {
    return (
        <div className={cn("relative overflow-hidden w-full py-4 bg-accent text-black border-y-2 border-black", className)}>
            <motion.div
                className="flex whitespace-nowrap"
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {Array.from({ length: repeat }).map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter px-4">
                        {text} •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
