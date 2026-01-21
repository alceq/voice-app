"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pricing() {
    const plans = [
        {
            name: "MVP",
            price: "STARTS AT $500",
            description: "Perfect for simple tasks and single-agent setups.",
            features: ["Single Workflow", "Basic Triggers", "Standard Support"],
        },
        {
            name: "SCALE",
            price: "DYNAMIC PRICING",
            description: "For businesses needing deep integrations and multi-step logic.",
            highlight: true,
            features: ["CRM Integration", "Complex Workflows", "Priority Support"],
        },
        {
            name: "CUSTOM",
            price: "TALK TO US",
            description: "Full-scale enterprise automation and bespoke development.",
            features: ["Bespoke Development", "Full Automation", "Dedicated Account Manager"],
        },
    ];

    return (
        <section id="pricing" className="py-24 bg-black text-white border-t-2 border-white/20">
            <Container>
                <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-16 text-center md:text-left">
                    INVESTMENT
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <div key={index} className={cn("relative", plan.highlight && "md:-mt-8")}>
                            {plan.highlight && (
                                <div className="absolute -top-12 left-0 right-0 text-center">
                                    <span className="bg-accent text-black font-bold font-mono px-4 py-1 uppercase tracking-widest text-sm border-2 border-white">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <Card
                                className={cn(
                                    "h-full flex flex-col justify-between",
                                    plan.highlight ? "bg-white text-black border-accent shadow-[8px_8px_0px_0px_#BFFF00]" : "bg-black text-white border-white"
                                )}
                            >
                                <div>
                                    <h3 className="text-3xl font-bold uppercase font-mono mb-2">{plan.name}</h3>
                                    <div className="text-5xl font-bold mb-6 tracking-tighter">{plan.price}</div>
                                    <p className="font-mono text-sm mb-8 opacity-80 border-b-2 border-current pb-8">
                                        {plan.description}
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className={cn("w-5 h-5 shrink-0", plan.highlight ? "text-black" : "text-accent")} />
                                                <span className="font-mono text-sm font-bold uppercase">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a href="https://cal.com/angell-alcequiez-zvrmco/growth-plan-call" target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button
                                        variant={plan.highlight ? "primary" : "outline"}
                                        className="w-full"
                                    >
                                        {plan.price === "TALK TO US" ? "CONTACT US" : "GET STARTED"}
                                    </Button>
                                </a>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center font-mono text-gray-400 uppercase text-sm">
                    30-day money back guarantee. No questions asked.
                </div>
            </Container>
        </section>
    );
}
