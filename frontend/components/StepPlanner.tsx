import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";

interface StepPlannerProps {
  formData: {
    budgetMin: string;
    budgetMax: string;
    attendeeCount: string;
    servicesNeeded: string[];
    timelineFlexibility: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const SERVICES = [
  "Catering",
  "Photography",
  "Videography",
  "Decoration",
  "Sound & Lighting",
  "Transportation",
  "Security",
  "Other",
];

export default function StepPlanner({
  formData,
  setFormData,
  onNext,
  onBack,
}: StepPlannerProps) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const toggleService = (service: string) => {
    const current = formData.servicesNeeded;
    const updated = current.includes(service)
      ? current.filter((s: string) => s !== service)
      : [...current, service];
    update("servicesNeeded", updated);
  };

  const isValid =
    formData.budgetMin &&
    formData.budgetMax &&
    Number(formData.budgetMax) >= Number(formData.budgetMin) &&
    formData.attendeeCount &&
    Number(formData.attendeeCount) > 0 &&
    formData.servicesNeeded.length > 0 &&
    formData.timelineFlexibility;

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors";

  return (
    <GlassCard>
      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="flex justify-between items-center mb-8">
        <span className="text-xs text-white/60 tracking-wide">Step 2 / 3</span>
        <span className="text-xs text-white/60 tracking-wide">Planner Details</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
        Planning requirements
      </h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Min Budget ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={formData.budgetMin}
              onChange={(e) => update("budgetMin", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Max Budget ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={formData.budgetMax}
              onChange={(e) => update("budgetMax", e.target.value)}
              className={inputClass}
            />
            {formData.budgetMin &&
              formData.budgetMax &&
              Number(formData.budgetMax) < Number(formData.budgetMin) && (
                <p className="text-xs text-accent mt-1">
                  Max must be greater than or equal to min
                </p>
              )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-2">
            Attendee Count
          </label>
          <input
            type="number"
            min="1"
            placeholder="Number of attendees"
            value={formData.attendeeCount}
            onChange={(e) => update("attendeeCount", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-3">
            Services Needed
          </label>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                  formData.servicesNeeded.includes(service)
                    ? "border-accent bg-accent/10 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-3">
            Timeline Flexibility
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "fixed", label: "Fixed Date" },
              { value: "flexible", label: "Flexible" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("timelineFlexibility", opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  formData.timelineFlexibility === opt.value
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-sm font-bold text-white">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button
          onClick={onBack}
          className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-xl px-6 py-3 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl px-8 py-3 transition-colors"
        >
          Continue
        </button>
      </div>
    </GlassCard>
  );
}
