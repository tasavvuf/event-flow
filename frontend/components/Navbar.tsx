"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, PlusCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 w-full max-w-4xl mx-auto px-4 mb-6 md:mb-10">
      <nav className="flex items-center justify-between px-5 py-3 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(225,29,72,0.1)]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-wider text-white group-hover:text-rose-300 transition-colors">
              EVENTFLOW
            </span>
            <span className="text-[9px] uppercase tracking-widest text-rose-400 font-semibold -mt-0.5">
              Portal
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              pathname === "/"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-900/40"
                : "text-white/70 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Requirement</span>
          </Link>

          <Link
            href="/events"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              pathname === "/events"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-900/40"
                : "text-white/70 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Events Directory</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
