"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Mic, Zap, Calendar, Ban, Layers, BarChart } from "lucide-react";

export function Solution() {
    const features = [
        { title: "ANSWER EVERYTHING", description: "Every call. Every time. Zero exceptions.", icon: Mic },
        { title: "SOUND HUMAN", description: "Not robotic garbage. Actual conversations.", icon: Zap },
        { title: "BOOK MEETINGS", description: "Straight to your calendar. Done.", icon: Calendar },
        { title: "QUALIFY LEADS", description: "Filter the tire-kickers automatically.", icon: Ban },
        { title: "INTEGRATE", description: "Works with your existing stack.", icon: Layers },
        { title: "SCALE", description: "Handle 1 call or 10,000. Same quality.", icon: BarChart },
    ];

    return (
        <section id="solution" className="py-24 bg-white text-black">
            <Container>
                <div className="mb-16">
                    <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
                        WE FIX <br />
                        THAT.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} variant="inverse" className="hover:bg-black hover:text-white transition-colors group">
                            <feature.icon className="w-12 h-12 mb-6 text-black group-hover:text-accent transition-colors" />
                            <h3 className="text-2xl font-bold font-mono uppercase mb-4 group-hover:text-accent transition-colors">
                                {feature.title}
                            </h3>
                            <p className="font-mono text-lg opacity-80 group-hover:opacity-100">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
