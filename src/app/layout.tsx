import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google"; // Updated fonts
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VOICE AI AGENCY | R1GHT ONE",
  description: "Stop missing calls. Start closing deals. 24/7 Voice AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
