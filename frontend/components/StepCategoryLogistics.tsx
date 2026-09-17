import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";
import { DollarSign, Sliders, Disc3, ShieldCheck, Clock3 } from "lucide-react";

interface StepCategoryLogisticsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepCategoryLogistics({
  formData,
  setFormData,
  onNext,
  onBack,
}: StepCategoryLogisticsProps) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/70 transition-all hover:border-white/20";

  let isValid = false;
  let categoryTitle = "";
  let categorySubtitle = "";

  if (formData.category === "planner") {
    categoryTitle = "Budget & Schedule Flexibility";
    categorySubtitle = "Establish financial parameters and calendar flexibility.";
    const hasMin = formData.budgetMin !== "" && !isNaN(Number(formData.budgetMin)) && Number(formData.budgetMin) >= 0;
    const hasMax = formData.budgetMax !== "" && !isNaN(Number(formData.budgetMax)) && Number(formData.budgetMax) >= 0;
    const isBudgetOrderValid = hasMin && hasMax && Number(formData.budgetMax) >= Number(formData.budgetMin);
    const hasTimeline = Boolean(formData.timelineFlexibility);
    isValid = hasMin && hasMax && isBudgetOrderValid && hasTimeline;
  } else if (formData.category === "performer") {
    categoryTitle = "Sound, Gear & Preferences";
    categorySubtitle = "Stage equipment availability and musical preferences.";
    // Performer equipmentProvided is boolean, genre is optional
    isValid = typeof formData.equipmentProvided === "boolean";
  } else if (formData.category === "crew") {
    categoryTitle = "Shift Timings & Equipment";
    categorySubtitle = "Define working hours schedule and gear responsibilities.";
    const hasStart = Boolean(formData.shiftStart);
    const hasEnd = Boolean(formData.shiftEnd);
    const isChronological = hasStart && hasEnd && new Date(formData.shiftEnd) > new Date(formData.shiftStart);
    const hasEquip = typeof formData.equipmentRequired === "boolean";
    isValid = hasStart && hasEnd && isChronological && hasEquip;
  }

  return (
    <GlassCard badgeLeft="STEP 3 OF 4" badgeRight="LOGISTICS & DETAILS">
      <ProgressBar currentStep={3} totalSteps={4} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <span className="uppercase tracking-wider">
            {formData.category === "planner"
              ? "Budget & Timeline"
              : formData.category === "performer"
              ? "Audio & Rider"
              : "Shift & Provisioning"}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {categoryTitle}
        </h1>
        <p className="text-sm text-white/60 mt-1.5">{categorySubtitle}</p>
      </div>

      {/* PLANNER STEP 3: Budget & Timeline */}
      {formData.category === "planner" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                <span>Minimum Budget ($) *</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 5000"
                value={formData.budgetMin}
                onChange={(e) => update("budgetMin", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                <span>Maximum Budget ($) *</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 12000"
                value={formData.budgetMax}
                onChange={(e) => update("budgetMax", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {formData.budgetMin &&
            formData.budgetMax &&
            Number(formData.budgetMax) < Number(formData.budgetMin) && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <span>⚠ Maximum budget must be greater than or equal to minimum budget</span>
              </div>
            )}

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span>Timeline Flexibility *</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: "fixed",
                  title: "Strict / Fixed",
                  desc: "Must occur exactly on the specified dates",
                },
                {
                  value: "flexible",
                  title: "Flexible Window",
                  desc: "Dates can shift within reason for the best vendors",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update("timelineFlexibility", opt.value)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.timelineFlexibility === opt.value
                      ? "border-rose-500 bg-rose-950/70 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">{opt.title}</div>
                  <div className="text-xs text-white/50">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PERFORMER STEP 3: Gear & Genre */}
      {formData.category === "performer" && (
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Sound & Stage Equipment Provided by Venue? *</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: true,
                  label: "Yes, Provided",
                  desc: "Venue/host supplies PA, monitors & microphones",
                },
                {
                  value: false,
                  label: "No (Performer Brings Gear)",
                  desc: "Performer needs to bring their own sound setup",
                },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => update("equipmentProvided", opt.value)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.equipmentProvided === opt.value
                      ? "border-rose-500 bg-rose-950/70 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">{opt.label}</div>
                  <div className="text-xs text-white/50">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Disc3 className="w-3.5 h-3.5 text-rose-400" />
              <span>Genre / Musical Style Preference (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Deep House, Indie Pop, Classic Jazz, Bollywood"
              value={formData.genrePreference}
              onChange={(e) => update("genrePreference", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* CREW STEP 3: Shift Times & Gear */}
      {formData.category === "crew" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <Clock3 className="w-3.5 h-3.5 text-rose-400" />
                <span>Shift Start Date & Time *</span>
              </label>
              <input
                type="datetime-local"
                value={formData.shiftStart}
                onChange={(e) => update("shiftStart", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
                <Clock3 className="w-3.5 h-3.5 text-rose-400" />
                <span>Shift End Date & Time *</span>
              </label>
              <input
                type="datetime-local"
                value={formData.shiftEnd}
                onChange={(e) => update("shiftEnd", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {formData.shiftStart &&
            formData.shiftEnd &&
            new Date(formData.shiftEnd) <= new Date(formData.shiftStart) && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <span>⚠ Shift end time must be after shift start time</span>
              </div>
            )}

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Special Equipment / PPE Required for Crew? *</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: true,
                  label: "Yes, Required",
                  desc: "Hardhats, radio headsets, steel-toes, or rigging gear",
                },
                {
                  value: false,
                  label: "Standard Attire Only",
                  desc: "Standard black crew attire, no heavy machinery tools",
                },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => update("equipmentRequired", opt.value)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.equipmentRequired === opt.value
                      ? "border-rose-500 bg-rose-950/70 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">{opt.label}</div>
                  <div className="text-xs text-white/50">{opt.desc}</div>
                </button>
              ))}
            </div>
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
          <span>Proceed to Final Review</span>
          <span>→</span>
        </button>
      </div>
    </GlassCard>
  );
}
