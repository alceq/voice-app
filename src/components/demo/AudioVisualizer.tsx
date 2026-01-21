"use client";

import { motion } from "framer-motion";

interface AudioVisualizerProps {
    volume: number;
    isActive: boolean;
}

export function AudioVisualizer({ volume, isActive }: AudioVisualizerProps) {
    // Normalize volume to 0-1 range roughly
    const safeVolume = Math.min(Math.max(volume * 5, 0.1), 1);

    return (
        <div className="flex items-end justify-center gap-1 md:gap-2 h-24 w-full px-8">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 md:w-3 bg-accent border border-black"
                    animate={{
                        height: isActive ? `${Math.max(10, Math.random() * 100 * safeVolume)}%` : "10%",
                    }}
                    transition={{ duration: 0.1 }}
                />
            ))}
        </div>
    );
}
