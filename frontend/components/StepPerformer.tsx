import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";

interface StepPerformerProps {
  formData: {
    performanceType: string;
    durationMinutes: string;
    audienceSize: string;
    equipmentProvided: boolean;
    genrePreference: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const PERFORMANCE_TYPES = [
  "Live Band",
  "DJ",
  "Solo Artist",
  "Comedian",
  "Speaker",
  "Dancer",
  "Other",
];

export default function StepPerformer({
  formData,
  setFormData,
  onNext,
  onBack,
}: StepPerformerProps) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const isValid =
    formData.performanceType &&
    formData.durationMinutes &&
    Number(formData.durationMinutes) > 0 &&
    formData.audienceSize &&
    Number(formData.audienceSize) > 0;

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors";

  return (
    <GlassCard>
      <ProgressBar currentStep={2} totalSteps={3} />

      <div className="flex justify-between items-center mb-8">
        <span className="text-xs text-white/60 tracking-wide">Step 2 / 3</span>
        <span className="text-xs text-white/60 tracking-wide">Performer Details</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
        Performance requirements
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-2">
            Performance Type
          </label>
          <select
            value={formData.performanceType}
            onChange={(e) => update("performanceType", e.target.value)}
            className={inputClass}
          >
            <option value="" className="bg-[#0a0a0a]">
              Select type
            </option>
            {PERFORMANCE_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#0a0a0a]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 60"
              value={formData.durationMinutes}
              onChange={(e) => update("durationMinutes", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 tracking-wide mb-2">
              Audience Size
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={formData.audienceSize}
              onChange={(e) => update("audienceSize", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-3">
            Equipment Provided
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => update("equipmentProvided", opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  formData.equipmentProvided === opt.value
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-sm font-bold text-white">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 tracking-wide mb-2">
            Genre Preference (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Jazz, Rock, Pop"
            value={formData.genrePreference}
            onChange={(e) => update("genrePreference", e.target.value)}
            className={inputClass}
          />
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
