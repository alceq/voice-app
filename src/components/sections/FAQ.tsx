"use client";

import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
    const faqs = [
        {
            question: "Doesn't AI voice sound terrible?",
            answer: "Not anymore. We use the latest models that understand context, tone, and interruption. Listen to the demo. It speaks for itself."
        },
        {
            question: "How fast can we go live?",
            answer: "We average 3-5 days from kickoff to launch. We don't mess around."
        },
        {
            question: "What if the AI screws up?",
            answer: "It can escalate to a human instantly. We set strict guardrails so it never promises things it can't deliver."
        },
        {
            question: "Will this actually integrate with our stuff?",
            answer: "Yes. Salesforce, HubSpot, Calendly, Zapier. If it has an API, we connect to it."
        },
        {
            question: "What's the catch?",
            answer: "No catch. You pay a setup fee and a monthly retainer. You get calls answered. Simple."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-white text-black border-t-2 border-black">
            <Container>
                <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-16">
                    QUESTIONS
                </h2>

                <div className="max-w-4xl mx-auto border-t-2 border-black">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b-2 border-black">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-8 text-left group hover:bg-black hover:text-white transition-colors px-4 md:px-8"
            >
                <span className="text-xl md:text-3xl font-bold font-mono uppercase pr-8">
                    {question}
                </span>
                <span className="shrink-0">
                    {isOpen ? <Minus className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 px-4 md:px-8 font-mono text-lg leading-relaxed max-w-3xl">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
