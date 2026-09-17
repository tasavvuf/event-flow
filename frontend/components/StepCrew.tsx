import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";

interface StepCrewProps {
  formData: {
    crewType: string;
    numberOfCrew: string;
    shiftStart: string;
    shiftEnd: string;
    equipmentRequired: boolean;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CREW_TYPES = [
  "Technical",
  "Stage Hands",
  "Security",
  "Audio/Visual",
  "Lighting",
  "Setup/Breakdown",
  "Other",
];

export default function StepCrew({
  formData,
  setFormData,
  onNext,
  onBack,
}: StepCrewProps) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const shiftEndAfterStart =
    formData.shiftStart &&
    formData.shiftEnd &&
    new Date(formData.shiftEnd) > new Date(formData.shiftStart);

  const isValid =
    formData.crewType &&
    formData.numberOfCrew &&
    Number(formData.numberOfCrew) > 0 &&
    formData.shiftStart &&
    formData.shiftEnd &&
    shiftEndAfterStart;

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors";

  return (
    <GlassCard>
      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="flex justify-between items-center mb-8">
        <span className="text-xs text-white/60 tracking-wide">Step 2 / 3</span>
        <span className="text-xs text-white/60 tracking-wide">Crew Details</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
        Crew requirements
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-2">
            Crew Type
          </label>
          <select
            value={formData.crewType}
            onChange={(e) => update("crewType", e.target.value)}
            className={inputClass}
          >
            <option value="" className="bg-[#0a0a0a]">
              Select type
            </option>
            {CREW_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#0a0a0a]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-2">
            Number of Crew
          </label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 10"
            value={formData.numberOfCrew}
            onChange={(e) => update("numberOfCrew", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Shift Start
            </label>
            <input
              type="datetime-local"
              value={formData.shiftStart}
              onChange={(e) => update("shiftStart", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Shift End
            </label>
            <input
              type="datetime-local"
              value={formData.shiftEnd}
              onChange={(e) => update("shiftEnd", e.target.value)}
              className={inputClass}
            />
            {formData.shiftStart &&
              formData.shiftEnd &&
              !shiftEndAfterStart && (
                <p className="text-xs text-accent mt-1">
                  Shift end must be after shift start
                </p>
              )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-3">
            Equipment Required
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => update("equipmentRequired", opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  formData.equipmentRequired === opt.value
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
