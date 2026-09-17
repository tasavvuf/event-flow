import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";
import { Users, Briefcase, Music, Clock, UsersRound, Wrench } from "lucide-react";

interface StepCategoryScopeProps {
  formData: any;
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
  "Venue Sourcing",
];

const PERFORMANCE_TYPES = [
  "Live Band",
  "DJ / Producer",
  "Solo Artist",
  "Acoustic Duo",
  "Comedian",
  "Keynote Speaker",
  "Dancer / Troupe",
  "Other",
];

const CREW_TYPES = [
  "Audio/Visual Technician",
  "Stage Hand & Rigging",
  "Lighting Operator",
  "Security & Crowd Control",
  "Setup & Breakdown",
  "Front of House Staff",
  "Technical Director",
  "Other",
];

export default function StepCategoryScope({
  formData,
  setFormData,
  onNext,
  onBack,
}: StepCategoryScopeProps) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const toggleService = (service: string) => {
    const current: string[] = formData.servicesNeeded || [];
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    update("servicesNeeded", updated);
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/70 transition-all hover:border-white/20";

  // Category specific validation for Step 2
  let isValid = false;
  let categoryTitle = "";
  let categorySubtitle = "";

  if (formData.category === "planner") {
    categoryTitle = "Planner Scope & Services";
    categorySubtitle = "Define attendance scale and necessary coordination domains.";
    isValid =
      Boolean(formData.attendeeCount) &&
      Number(formData.attendeeCount) > 0 &&
      Array.isArray(formData.servicesNeeded) &&
      formData.servicesNeeded.length > 0;
  } else if (formData.category === "performer") {
    categoryTitle = "Performance Specifications";
    categorySubtitle = "Detail performance genre, audience scale, and duration.";
    isValid =
      Boolean(formData.performanceType) &&
      Boolean(formData.durationMinutes) &&
      Number(formData.durationMinutes) > 0 &&
      Boolean(formData.audienceSize) &&
      Number(formData.audienceSize) > 0;
  } else if (formData.category === "crew") {
    categoryTitle = "Crew Discipline & Headcount";
    categorySubtitle = "Specify technical or operational roles and team count.";
    isValid =
      Boolean(formData.crewType) &&
      Boolean(formData.numberOfCrew) &&
      Number(formData.numberOfCrew) > 0;
  }

  return (
    <GlassCard badgeLeft="STEP 2 OF 4" badgeRight="CATEGORY SCOPE">
      <ProgressBar currentStep={2} totalSteps={4} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <span className="uppercase tracking-wider">
            {formData.category === "planner"
              ? "Event Planner"
              : formData.category === "performer"
              ? "Performer"
              : "Crew & Support"}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {categoryTitle}
        </h1>
        <p className="text-sm text-white/60 mt-1.5">{categorySubtitle}</p>
      </div>

      {/* PLANNER STEP 2 */}
      {formData.category === "planner" && (
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Expected Guest / Attendee Count *</span>
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 250"
              value={formData.attendeeCount}
              onChange={(e) => update("attendeeCount", e.target.value)}
              className={inputClass}
            />
            <span className="text-[11px] text-white/40 mt-1 block">
              Helps planners gauge team scale, seating, and logistics.
            </span>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5 text-rose-400" />
              <span>Required Services (Select at least one) *</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SERVICES.map((service) => {
                const isSelected = formData.servicesNeeded?.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                      isSelected
                        ? "border-rose-500 bg-rose-950/70 text-rose-200 shadow-[0_0_12px_rgba(225,29,72,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.07] hover:border-white/20"
                    }`}
                  >
                    <span className="mr-1.5 text-rose-400">
                      {isSelected ? "✓" : "+"}
                    </span>
                    {service}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PERFORMER STEP 2 */}
      {formData.category === "performer" && (
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              <span>Performance Type *</span>
            </label>
            <div className="relative">
              <select
                value={formData.performanceType}
                onChange={(e) => update("performanceType", e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer pr-10`}
              >
                <option value="" className="bg-[#120509] text-white/50">
                  Select act type...
                </option>
                {PERFORMANCE_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#120509] text-white">
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                ▼
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Duration (Minutes) *</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 90"
                value={formData.durationMinutes}
                onChange={(e) => update("durationMinutes", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <span>Target Audience Size *</span>
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
        </div>
      )}

      {/* CREW STEP 2 */}
      {formData.category === "crew" && (
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5 text-rose-400" />
              <span>Crew Specialization *</span>
            </label>
            <div className="relative">
              <select
                value={formData.crewType}
                onChange={(e) => update("crewType", e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer pr-10`}
              >
                <option value="" className="bg-[#120509] text-white/50">
                  Select specialization...
                </option>
                {CREW_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#120509] text-white">
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                ▼
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <UsersRound className="w-3.5 h-3.5 text-rose-400" />
              <span>Number of Crew Personnel Needed *</span>
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 8"
              value={formData.numberOfCrew}
              onChange={(e) => update("numberOfCrew", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-9">
        <button
          type="button"
          onClick={onBack}
          className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/[0.04] rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 bg-gradient-to-r from-rose-600 via-crimson-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl py-3.5 shadow-[0_4px_20px_rgba(225,29,72,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <span>Continue to Logistics</span>
          <span>→</span>
        </button>
      </div>
    </GlassCard>
  );
}
