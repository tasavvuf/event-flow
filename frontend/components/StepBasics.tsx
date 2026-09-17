import GlassCard from "./GlassCard";
import CategoryCard from "./CategoryCard";
import ProgressBar from "./ProgressBar";
import { Calendar, MapPin, Tag, Sparkles, UserCheck, Mic, HardHat } from "lucide-react";

interface StepBasicsProps {
  formData: {
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    venue: string;
    category: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

const EVENT_TYPES = [
  "Corporate",
  "Wedding",
  "Concert",
  "Festival",
  "Sports",
  "Workshop",
  "Private Party",
  "Other",
];

const categories = [
  {
    key: "planner",
    title: "Event Planner",
    description: "Full coordination, vendors, timeline, and budget planning",
    icon: <UserCheck className="w-5 h-5 text-rose-400" />,
  },
  {
    key: "performer",
    title: "Performer",
    description: "Live musicians, DJs, solo acts, speakers, and entertainment",
    icon: <Mic className="w-5 h-5 text-rose-400" />,
  },
  {
    key: "crew",
    title: "Crew / Staff",
    description: "AV technicians, stage hands, security, and event operations",
    icon: <HardHat className="w-5 h-5 text-rose-400" />,
  },
];

export default function StepBasics({
  formData,
  setFormData,
  onNext,
}: StepBasicsProps) {
  const update = (field: string, value: string) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const isValid =
    formData.eventName.trim() &&
    formData.eventType &&
    formData.startDate &&
    formData.location.trim() &&
    formData.category;

  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/70 transition-all hover:border-white/20";

  return (
    <GlassCard badgeLeft="STEP 1 OF 4" badgeRight="EVENT BASICS">
      <ProgressBar currentStep={1} totalSteps={4} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Information</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Tell us about your event
        </h1>
        <p className="text-sm text-white/60 mt-1.5">
          Provide the event fundamentals to get tailored recommendations.
        </p>
      </div>

      <div className="space-y-5">
        {/* Event Name */}
        <div>
          <label className="block text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
            Event Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Neon Horizon Gala 2026"
            value={formData.eventName}
            onChange={(e) => update("eventName", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
            Event Type *
          </label>
          <div className="relative">
            <select
              value={formData.eventType}
              onChange={(e) => update("eventType", e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer pr-10`}
            >
              <option value="" className="bg-[#120509] text-white/50">
                Select event type...
              </option>
              {EVENT_TYPES.map((type) => (
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

        {/* Dates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Calendar className="w-3 h-3 text-rose-400" />
              <span>Start Date *</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Calendar className="w-3 h-3 text-white/40" />
              <span>End Date (optional)</span>
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Location & Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>City / Location *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-200/80 uppercase tracking-wider mb-2">
              <Tag className="w-3 h-3 text-white/40" />
              <span>Venue Name (optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Palace of Fine Arts"
              value={formData.venue}
              onChange={(e) => update("venue", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <label className="block text-[11px] font-bold text-rose-200/90 uppercase tracking-widest mb-3">
          What are you hiring for? *
        </label>
        <p className="text-xs text-white/50 mb-4">
          Steps 2 and 3 will automatically configure to your selected category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              selected={formData.category === cat.key}
              onClick={() => update("category", cat.key)}
            />
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-9">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-rose-600 via-crimson-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl py-3.5 shadow-[0_4px_20px_rgba(225,29,72,0.4)] transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>Continue to Category Scope</span>
          <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </GlassCard>
  );
}
