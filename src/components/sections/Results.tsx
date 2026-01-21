"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export function Results() {


    return (
        <section id="results" className="py-24 bg-black text-white border-t-2 border-white/20">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
                        SEE IT <br />
                        IN ACTION.
                    </h2>
                </div>

                {/* Workflow Steps */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    <Card className="bg-accent text-black border-black shadow-[4px_4px_0px_0px_white]">
                        <div className="text-xl md:text-2xl font-bold font-mono uppercase tracking-tighter mb-2">Inbound Call</div>
                        <div className="text-sm font-mono font-bold opacity-80">Client calls at 11 PM</div>
                    </Card>
                    <Card className="bg-accent text-black border-black shadow-[4px_4px_0px_0px_white]">
                        <div className="text-xl md:text-2xl font-bold font-mono uppercase tracking-tighter mb-2">Instant Pickup</div>
                        <div className="text-sm font-mono font-bold opacity-80">AI answers in &lt;1s</div>
                    </Card>
                    <Card className="bg-accent text-black border-black shadow-[4px_4px_0px_0px_white]">
                        <div className="text-xl md:text-2xl font-bold font-mono uppercase tracking-tighter mb-2">Negotiation</div>
                        <div className="text-sm font-mono font-bold opacity-80">Prices & Calendar</div>
                    </Card>
                    <Card className="bg-accent text-black border-black shadow-[4px_4px_0px_0px_white]">
                        <div className="text-xl md:text-2xl font-bold font-mono uppercase tracking-tighter mb-2">Conversion</div>
                        <div className="text-sm font-mono font-bold opacity-80">Booked Automatically</div>
                    </Card>
                </div>

                {/* Case Studies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card variant="inverse" className="rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="border-b-2 border-black/10 pb-4 mb-4 flex justify-between items-center">
                            <span className="font-mono font-bold uppercase text-accent bg-black px-2 py-1 text-sm">Case Study A</span>
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4">The Late Night Lead</h3>
                        <p className="text-lg font-mono text-gray-800">
                            A potential client calls at 9:30 PM. Usually, this goes to voicemail and the lead is lost. With Right One, our AI answers, handles the inquiry, and books them for Tuesday morning.
                        </p>
                    </Card>

                    <Card variant="inverse" className="-rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="border-b-2 border-black/10 pb-4 mb-4 flex justify-between items-center">
                            <span className="font-mono font-bold uppercase text-accent bg-black px-2 py-1 text-sm">Case Study B</span>
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4">The Busy Receptionist</h3>
                        <p className="text-lg font-mono text-gray-800">
                            Your front desk is overwhelmed. Instead of putting high-value clients on hold, our AI steps in to handle the overflow, filtering spam and scheduling serious inquiries instantly.
                        </p>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
