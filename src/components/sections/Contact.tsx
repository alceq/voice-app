"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Contact() {
    return (
        <section className="py-24 bg-accent text-black border-t-2 border-black">
            <Container className="text-center">
                <h2 className="text-6xl md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                    READY TO STOP <br />
                    LOSING CALLS?
                </h2>

                <a href="https://cal.com/angell-alcequiez-zvrmco/growth-plan-call" target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="secondary"
                        size="xl"
                        className="text-2xl md:text-4xl h-24 md:h-32 px-16 shadow-[8px_8px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
                    >
                        LET'S BUILD YOUR AI
                    </Button>
                </a>
            </Container>
        </section>
    );
}
