"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black text-white">
            {/* Background Noise/Texture can go here */}

            <Container className="relative z-10 flex flex-col items-start justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="max-w-[90vw]"
                >
                    <h1 className="text-6xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase font-mono">
                        YOUR PHONE <br />
                        IS RINGING. <br />
                        <span className="text-accent">ARE YOU ANSWERING?</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
                    className="mt-8 max-w-xl"
                >
                    <p className="text-xl md:text-2xl font-mono text-gray-300">
                        Missed calls = Missed revenue. <br />
                        Deploy 24/7 AI agents that actually sound human.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-12 flex flex-col md:flex-row gap-6"
                >
                    <a href="https://cal.com/angell-alcequiez-zvrmco/growth-plan-call" target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="lg" className="text-2xl h-16 px-12">
                            DEPLOY NOW
                        </Button>
                    </a>
                    <a href="#demo">
                        <Button variant="outline" size="lg" className="text-2xl h-16 px-12">
                            HEAR THE DEMO
                        </Button>
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
