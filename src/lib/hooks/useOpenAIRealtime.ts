"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseOpenAIRealtimeProps {
    apiKey?: string;
}

export function useOpenAIRealtime({ apiKey }: UseOpenAIRealtimeProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [agentState, setAgentState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
    const [volume, setVolume] = useState(0);

    const socketRef = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);

    // Audio Queue Logic
    const nextStartTimeRef = useRef<number>(0);
    const scheduledAudioSourcesRef = useRef<AudioBufferSourceNode[]>([]);

    const connect = useCallback(async () => {
        try {
            // 1. Get Ephemeral Token from our server
            const tokenResponse = await fetch("/api/session");
            const data = await tokenResponse.json();

            if (!tokenResponse.ok) {
                setError(`Server Error: ${data.error}`);
                return;
            }

            const ephemeralKey = data.client_secret.value;

            // 2. Connect using the Ephemeral Token
            // We use the same 'insecure' subprotocol because it simply passes the token.
            // Even though it says 'insecure', using an ephemeral token here is the secure pattern.
            const ws = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17", [
                "realtime",
                "openai-insecure-api-key." + ephemeralKey,
                "openai-beta.realtime-v1",
            ]);

            ws.onopen = () => {
                console.log("Connected to OpenAI Realtime API via Ephemeral Token");
                setIsConnected(true);
                setAgentState("idle");

                // Reset audio state
                nextStartTimeRef.current = 0;
                scheduledAudioSourcesRef.current = [];

                // Note: 'voice: echo' is already set in the session generation on the server,
                // but we can send updated instructions here if needed.
                const sessionUpdate = {
                    type: "session.update",
                    session: {
                        instructions: `You are R1GHT ONE, an AI voice assistant for a bold, no-BS voice AI agency. Your personality is confident, direct, and friendly - but you don't waste time with corporate speak or filler.
Your style:
Get to the point quickly
Be confident but not arrogant
Use plain language, not jargon
It's okay to be a little casual and human
If someone's skeptical, engage with their concerns directly
Your goals:
Greet them warmly but efficiently
Find out what business they're in and their biggest phone headache
Explain how voice AI solves their specific problem
Share that we have flexible options: MVP builds start at $500 for simple needs, while complex scaling solutions use dynamic pricing based on usage and features.
Push (gently) for a call booking - "Want to see what this would look like for your business?"
Handle objections directly: "Yeah, I get it, AI voice has sucked until recently. That's why you should try talking to me right now."
Keep it tight - 1-2 sentences per response usually. Match their energy. If they're casual, be casual. If they're all business, be efficient.
Remember: You're proving that AI voice doesn't have to be terrible. Be impressive.`,
                        modalities: ["text", "audio"],
                        input_audio_format: "pcm16",
                        output_audio_format: "pcm16",
                        turn_detection: {
                            type: "server_vad",
                        }
                    },
                };
                ws.send(JSON.stringify(sessionUpdate));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "response.audio.delta") {
                    playAudioChunk(data.delta);
                    setAgentState("speaking");
                }

                if (data.type === "response.done") {
                    setAgentState("idle");
                }

                if (data.type === "input_audio_buffer.speech_started") {
                    setAgentState("listening");
                    clearAudioQueue();
                }

                if (data.type === "error") {
                    console.error("OpenAI Error:", data);
                    setError(data.error?.message || "An unknown error occurred");
                }
            };

            ws.onerror = (e) => {
                console.error("WebSocket error:", e);
                // Don't overwrite specific error messages if we already set one
                setError((prev) => prev || "Connection failed.");
                setIsConnected(false);
            };

            ws.onclose = (event) => {
                console.log("Disconnected", event.code, event.reason);
                setIsConnected(false);
                setAgentState("idle");

                if (event.code !== 1000) {
                    setError(`Connection closed: ${event.code} ${event.reason || "Unknown reason"}`);
                }
            };

            socketRef.current = ws;

            await setupAudio();

        } catch (err: any) {
            setError(err.message);
        }
    }, []); // Removed apiKey dependency since we fetch it internally

    const setupAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
                sampleRate: 24000,
            });
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);

            processor.onaudioprocess = (e) => {
                if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

                const inputData = e.inputBuffer.getChannelData(0);

                let sum = 0;
                for (let i = 0; i < inputData.length; i++) {
                    sum += inputData[i] * inputData[i];
                }
                setVolume(Math.sqrt(sum / inputData.length));

                const pcm16 = floatTo16BitPCM(inputData);
                const base64 = arrayBufferToBase64(pcm16);

                socketRef.current.send(JSON.stringify({
                    type: "input_audio_buffer.append",
                    audio: base64,
                }));
            };

            source.connect(processor);
            processor.connect(audioContext.destination);
            processorRef.current = processor;

            setIsSessionActive(true);

        } catch (err) {
            console.error("Audio setup error", err);
            setError("Microphone access denied.");
        }
    };

    const clearAudioQueue = () => {
        scheduledAudioSourcesRef.current.forEach(source => {
            try {
                source.stop();
            } catch (e) {
                // ignore
            }
        });
        scheduledAudioSourcesRef.current = [];
        if (audioContextRef.current) {
            nextStartTimeRef.current = audioContextRef.current.currentTime;
        }
    };

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        clearAudioQueue();

        setIsConnected(false);
        setIsSessionActive(false);
        setAgentState("idle");
        setVolume(0);
    }, []);

    const playAudioChunk = (base64Audio: string) => {
        if (!audioContextRef.current) return;

        try {
            const binaryString = window.atob(base64Audio);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const int16Array = new Int16Array(bytes.buffer);
            const float32Array = new Float32Array(int16Array.length);

            for (let i = 0; i < int16Array.length; i++) {
                float32Array[i] = int16Array[i] / 32768.0;
            }

            const buffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
            buffer.getChannelData(0).set(float32Array);

            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);

            // Scheduling logic
            const currentTime = audioContextRef.current.currentTime;

            // Ensure we never schedule in the past, but try to keep it continuous
            // If nextStartTime is way behind (e.g. initial start), catch up to currentTime
            if (nextStartTimeRef.current < currentTime) {
                nextStartTimeRef.current = currentTime;
            }

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;

            scheduledAudioSourcesRef.current.push(source);
            source.onended = () => {
                scheduledAudioSourcesRef.current = scheduledAudioSourcesRef.current.filter(s => s !== source);
            };

        } catch (e) {
            console.error("Audio playback error", e);
        }
    };

    return { connect, disconnect, isConnected, isSessionActive, error, agentState, volume };
}

function floatTo16BitPCM(input: Float32Array) {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
