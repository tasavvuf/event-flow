import React from "react";
import { Check } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode | string;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        selected
          ? "bg-gradient-to-br from-rose-950/60 via-[#1f0910]/70 to-[#120408]/80 border-rose-500/70 shadow-[0_0_25px_rgba(225,29,72,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.02]"
          : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] shadow-md"
      }`}
    >
      {/* Selected glowing top accent */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-crimson-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
              selected
                ? "bg-rose-600/30 text-rose-300 border border-rose-500/40 shadow-inner"
                : "bg-white/5 text-white/80 border border-white/10 group-hover:scale-105"
            }`}
          >
            {icon}
          </div>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              selected
                ? "bg-rose-600 text-white shadow-[0_0_8px_rgba(225,29,72,0.6)]"
                : "border border-white/20 opacity-40 group-hover:opacity-70"
            }`}
          >
            {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>

        <div className="text-base font-bold text-white mb-1 group-hover:text-rose-200 transition-colors">
          {title}
        </div>
        <div className="text-xs text-white/60 tracking-wide leading-relaxed">
          {description}
        </div>
      </div>
    </button>
  );
}
