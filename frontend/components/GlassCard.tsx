import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  badgeLeft?: string;
  badgeRight?: string;
}

export default function GlassCard({
  children,
  className = "",
  badgeLeft,
  badgeRight,
}: GlassCardProps) {
  return (
    <div
      className={`relative w-full max-w-2xl mx-auto rounded-[32px] p-7 md:p-10 transition-all duration-300
        bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.01]
        backdrop-blur-2xl
        border border-white/20
        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(225,29,72,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)]
        overflow-hidden ${className}`}
    >
      {/* Subtle top glare / glass gradient line */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Optional reference-style top meta badges */}
      {(badgeLeft || badgeRight) && (
        <div className="flex justify-between items-center text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-6 select-none">
          <span>{badgeLeft}</span>
          <span>{badgeRight}</span>
        </div>
      )}

      {children}
    </div>
  );
}
