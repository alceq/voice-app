import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="bg-black text-white py-12 border-t-2 border-white/20">
            <Container className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                    <h2 className="text-3xl font-bold font-mono uppercase mb-4">
                        R1GHT <span className="text-accent">ONE</span>
                    </h2>
                    <p className="max-w-xs text-gray-400 font-mono text-sm">
                        The anti-agency agency for voice AI. We build bots that actually work.
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-sm font-mono uppercase">
                    <a href="#" className="hover:text-accent hover:underline">Twitter / X</a>
                    <a href="#" className="hover:text-accent hover:underline">LinkedIn</a>
                    <a href="#" className="hover:text-accent hover:underline">Instagram</a>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500 font-mono">
                        &copy; {new Date().getFullYear()} R1GHT ONE
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        DESIGNED WITH RAGE.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
