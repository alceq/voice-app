"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "#problem", label: "The Problem" },
    { href: "#solution", label: "Solution" },
    { href: "#results", label: "Results" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-white/20">
            <Container className="flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold font-mono tracking-tighter uppercase text-white hover:text-accent transition-colors">
                    R1GHT <span className="text-accent">ONE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-mono uppercase tracking-widest text-white hover:text-accent transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a href="https://cal.com/angell-alcequiez-zvrmco/growth-plan-call" target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm">
                            Book Demo
                        </Button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-accent"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-4xl font-bold uppercase font-mono text-white hover:text-accent hover:rotate-2 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href="https://cal.com/angell-alcequiez-zvrmco/growth-plan-call" target="_blank" rel="noopener noreferrer" className="w-full mt-8">
                            <Button variant="primary" size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                                Book Demo
                            </Button>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
