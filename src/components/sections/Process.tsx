"use client";

import { Container } from "@/components/ui/Container";

export function Process() {
    const steps = [
        { number: "01", title: "DISCOVERY", description: "We learn your business. What calls you get. What matters." },
        { number: "02", title: "BUILD", description: "We create your custom AI agent. Not a template. Yours." },
        { number: "03", title: "TEST", description: "We break it before your customers can. Obsessively." },
        { number: "04", title: "LAUNCH", description: "Go live. Start converting. Watch the numbers climb." },
    ];

    return (
        <section id="process" className="py-24 bg-white text-black border-t-2 border-black">
            <Container>
                <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-16">
                    HOW WE <br />
                    DO IT
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t-2 border-l-2 border-black">
                    {steps.map((step, index) => (
                        <div key={index} className="border-r-2 border-b-2 border-black p-8 hover:bg-black hover:text-white transition-colors group h-full flex flex-col justify-between">
                            <span className="text-6xl font-bold font-mono text-gray-300 group-hover:text-accent transition-colors block mb-12">
                                {step.number}
                            </span>
                            <div>
                                <h3 className="text-3xl font-bold uppercase mb-4 tracking-tight group-hover:text-accent transition-colors">
                                    {step.title}
                                </h3>
                                <p className="font-mono text-sm leading-relaxed opacity-80 group-hover:opacity-100">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
