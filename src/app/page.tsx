import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/Marquee";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Results } from "@/components/sections/Results";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { VoiceDemo } from "@/components/demo/VoiceDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />
      <Hero />
      <Marquee text="24/7 AVAILABILITY • AI THAT SOUNDS HUMAN • NEVER MISS A LEAD • CONVERT MORE CALLS" />
      <Problem />
      <Solution />
      <div className="bg-accent py-2"></div> {/* Divider */}
      <VoiceDemo />
      <Results />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
