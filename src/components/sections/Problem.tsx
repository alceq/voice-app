"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export function Problem() {
    const stats = [
        { value: "67%", label: "Callers won't leave a voicemail", color: "text-red-500" },
        { value: "85%", label: "Will call a competitor instead", color: "text-red-500" },
        { value: "40%", label: "Average missed calls per business", color: "text-red-500" },
    ];

    return (
        <section id="problem" className="py-24 bg-black text-white border-t-2 border-white/20">
            <Container>
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1">
                        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
                            YOU'RE <br />
                            LOSING <br />
                            MONEY.
                        </h2>
                        <p className="text-xl font-mono text-gray-300 max-w-lg">
                            Every missed call is a missed opportunity. Your team can't answer 24/7. But AI can.
                        </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 gap-6 w-full">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-l-8 border-l-red-600 border-white">
                                    <h3 className={`text-6xl font-bold font-mono ${stat.color} mb-2`}>{stat.value}</h3>
                                    <p className="text-xl font-mono uppercase">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
