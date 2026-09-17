import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "EventFlow • Requirement Posting & Event Management",
  description:
    "Premium event requirement posting portal for Event Planners, Performers, and Technical Crew.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen relative selection:bg-rose-500 selection:text-white bg-[#0a0204]`}>
        {/* Static Dual-Tone Crimson Spheres Background (Exact composition inspired by design reference) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          {/* Base deep background */}
          <div className="absolute inset-0 bg-[#090204]" />

          {/* Upper Center Dark / Deep Wine Sphere */}
          <div
            className="absolute top-[5%] sm:top-[8%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] rounded-full"
            style={{
              background: "radial-gradient(circle at 50% 50%, #22060b 0%, #130306 65%, #090204 100%)",
            }}
          />

          {/* Lower Center Vibrant Crimson/Scarlet Sphere */}
          <div
            className="absolute top-[34%] sm:top-[36%] md:top-[38%] left-1/2 -translate-x-1/2 w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] rounded-full shadow-[0_0_120px_rgba(225,29,72,0.45)]"
            style={{
              background: "radial-gradient(circle at 50% 35%, #ff1a3c 0%, #db0b27 40%, #8a0717 80%, #3e020a 100%)",
            }}
          />

          {/* Left Ambient Crimson Curved Disc */}
          <div
            className="absolute -left-[20%] sm:-left-[12%] md:-left-[6%] top-[24%] w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] rounded-full opacity-70"
            style={{
              background: "radial-gradient(circle at 40% 50%, #850b18 0%, #380309 65%, transparent 100%)",
            }}
          />

          {/* Right Ambient Dark Crimson Curved Disc */}
          <div
            className="absolute -right-[20%] sm:-right-[12%] md:-right-[6%] top-[28%] w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] rounded-full opacity-70"
            style={{
              background: "radial-gradient(circle at 60% 50%, #700814 0%, #2e0308 65%, transparent 100%)",
            }}
          />

          {/* Subtle Ambient Vignette Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090204]/70 via-transparent to-[#090204]/50 pointer-events-none" />
        </div>

        {/* Floating Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col items-center justify-start px-4 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
