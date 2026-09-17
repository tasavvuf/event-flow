interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  stepTitles?: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps = 4,
  stepTitles = ["Basics", "Scope", "Logistics", "Review"],
}: ProgressBarProps) {
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className="w-full mb-8">
      {/* Steps indicator dots */}
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={stepNum} className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.8)] scale-110 border border-white/40"
                    : isCompleted
                    ? "bg-rose-950/80 border border-rose-500/60 text-rose-300"
                    : "bg-white/5 border border-white/10 text-white/40"
                }`}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase mt-1 font-semibold transition-colors hidden sm:block ${
                  isActive
                    ? "text-rose-400"
                    : isCompleted
                    ? "text-white/70"
                    : "text-white/30"
                }`}
              >
                {stepTitles[i] || `Step ${stepNum}`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-crimson-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
