"use client";

import { useState, useEffect } from "react";
import { useOpenAIRealtime } from "@/lib/hooks/useOpenAIRealtime";
import { AudioVisualizer } from "./AudioVisualizer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Mic, Square, AlertCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceDemo() {
    const [apiKey, setApiKey] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Only safely access env vars and set defaults after mount to match hydration
        setApiKey(process.env.NEXT_PUBLIC_OPENAI_API_KEY || "");
    }, []);

    const { connect, disconnect, isConnected, isSessionActive, error, agentState, volume } = useOpenAIRealtime({ apiKey });

    if (!isMounted) {
        // Return a placeholder structure that matches the server output as closely as possible,
        // or a loading state. For massive hydration simplificiation, we can return null (not recommended for SEO)
        // or a skeleton. Given this is a demo section below the fold, a loading text is acceptable.
        return (
            <section id="demo" className="py-24 bg-accent text-black border-t-2 border-black">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <span className="font-mono font-bold text-xl uppercase">LOADING DEMO SYSTEM...</span>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section id="demo" className="py-24 bg-accent text-black border-t-2 border-black">
            <Container>
                <div className="flex flex-col items-center justify-center mb-12 text-center">
                    <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
                        DON'T TAKE OUR <br /> WORD FOR IT.
                    </h2>
                    <p className="text-xl font-bold font-mono bg-black text-white px-4 py-2 uppercase">
                        Call our AI. Right now.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Card className="bg-black text-white border-2 border-white shadow-[8px_8px_0px_0px_#000000] p-4 md:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b-2 border-white/20 pb-4 mb-4">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-6 h-6" />
                                <span className="font-mono font-bold uppercase text-accent">AI_AGENT_V1.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={cn("w-3 h-3 rounded-full", isConnected ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                                <span className="font-mono text-sm uppercase">{isConnected ? "ONLINE" : "OFFLINE"}</span>
                            </div>
                        </div>

                        {/* API Key Input (if needed) */}
                        {!apiKey && !isConnected && (
                            <div className="mb-8">
                                <label className="block font-mono text-sm mb-2 text-gray-400">ENTER OPENAI API KEY (Required for Demo)</label>
                                <input
                                    type="password"
                                    className="w-full bg-white/10 border-2 border-white p-4 font-mono text-white focus:outline-none focus:border-accent"
                                    placeholder="sk-..."
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Visualizer Area */}
                        <div className="h-64 bg-white/5 border-2 border-white/20 mb-8 flex items-center justify-center relative overflow-hidden">
                            {/* Grid Pattern */}
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                            </div>

                            {isConnected ? (
                                <div className="w-full z-10 flex flex-col items-center justify-center">
                                    <div className="mb-4 font-mono text-xl font-bold uppercase tracking-widest text-accent">
                                        {agentState === "idle" && "LISTENING..."}
                                        {agentState === "listening" && "USER SPEAKING..."}
                                        {agentState === "thinking" && "PROCESSING..."}
                                        {agentState === "speaking" && "AGENT SPEAKING"}
                                    </div>
                                    <AudioVisualizer volume={volume} isActive={agentState !== "idle"} />
                                </div>
                            ) : (
                                <div className="z-10 text-center font-mono text-gray-500 uppercase">
                                    SYSTEM STRBY
                                </div>
                            )}
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-500/20 border-2 border-red-500 p-4 mb-8 flex items-center gap-3">
                                <AlertCircle className="text-red-500" />
                                <span className="font-mono text-red-500 uppercase font-bold">{error}</span>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex justify-center">
                            {!isConnected ? (
                                <Button
                                    variant="primary"
                                    size="xl"
                                    onClick={connect}
                                    className="w-full md:w-auto"
                                    disabled={!apiKey}
                                >
                                    INITIALIZE CONNECTION
                                </Button>
                            ) : (
                                <Button
                                    variant="destructive"
                                    size="xl"
                                    onClick={disconnect}
                                    className="w-full md:w-auto flex items-center gap-3"
                                >
                                    <Square className="w-5 h-5 fill-current" />
                                    TERMINATE SESSION
                                </Button>
                            )}
                        </div>
                    </Card>

                    <p className="mt-8 text-center font-mono text-sm font-bold uppercase text-black/60">
                        Powered by OpenAI Realtime API (GPT-4o)
                    </p>
                </div>
            </Container>
        </section>
    );
}
