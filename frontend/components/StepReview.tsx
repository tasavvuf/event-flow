import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";
import { CheckCircle, ArrowLeft, Send, Sparkles } from "lucide-react";

interface StepReviewProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number | boolean | string[] | undefined | null;
  highlight?: boolean;
}) {
  let display: React.ReactNode;

  if (typeof value === "boolean") {
    display = (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          value
            ? "bg-rose-950 border border-rose-500/40 text-rose-300"
            : "bg-white/10 text-white/70"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>
    );
  } else if (Array.isArray(value)) {
    display = (
      <div className="flex flex-wrap gap-1.5 justify-end max-w-[65%]">
        {value.length > 0 ? (
          value.map((v) => (
            <span
              key={v}
              className="px-2 py-0.5 rounded-md bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs font-medium"
            >
              {v}
            </span>
          ))
        ) : (
          <span className="text-white/40 text-xs">None</span>
        )}
      </div>
    );
  } else if (!value || value === "") {
    display = <span className="text-white/30 text-xs">Not specified</span>;
  } else {
    display = (
      <span
        className={`text-xs md:text-sm font-semibold text-right ${
          highlight ? "text-rose-300" : "text-white/90"
        }`}
      >
        {String(value)}
      </span>
    );
  }

  return (
    <div className="flex justify-between items-start py-3 border-b border-white/[0.06] last:border-0">
      <span className="text-xs text-white/50 font-medium tracking-wide">
        {label}
      </span>
      {display}
    </div>
  );
}

export default function StepReview({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
}: StepReviewProps) {
  const categoryLabel =
    formData.category === "planner"
      ? "Event Planner"
      : formData.category === "performer"
      ? "Performer"
      : "Crew / Staff";

  return (
    <GlassCard badgeLeft="STEP 4 OF 4" badgeRight="CONFIRM & SUBMIT">
      <ProgressBar currentStep={4} totalSteps={4} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Verification</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Review your requirement
        </h1>
        <p className="text-sm text-white/60 mt-1.5">
          Verify your event specifics before publishing to the backend database.
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Basics Section */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <h2 className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-2">
              <span>Event Overview</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]">
              {categoryLabel}
            </span>
          </div>

          <div>
            <SummaryRow label="Event Name" value={formData.eventName} highlight />
            <SummaryRow label="Event Type" value={formData.eventType} />
            <SummaryRow
              label="Schedule"
              value={
                formData.endDate
                  ? `${formData.startDate} to ${formData.endDate}`
                  : formData.startDate
              }
            />
            <SummaryRow label="Location" value={formData.location} />
            {formData.venue && <SummaryRow label="Venue" value={formData.venue} />}
          </div>
        </div>

        {/* Category Details Section */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
          <h2 className="text-xs font-bold text-rose-300 uppercase tracking-widest mb-3 pb-2 border-b border-white/10">
            Category Specifications
          </h2>

          <div>
            {formData.category === "planner" && (
              <>
                <SummaryRow
                  label="Budget Range"
                  value={`$${Number(formData.budgetMin).toLocaleString()} — $${Number(
                    formData.budgetMax
                  ).toLocaleString()}`}
                  highlight
                />
                <SummaryRow
                  label="Attendee Count"
                  value={`${Number(formData.attendeeCount).toLocaleString()} guests`}
                />
                <SummaryRow
                  label="Services Required"
                  value={formData.servicesNeeded}
                />
                <SummaryRow
                  label="Timeline Flexibility"
                  value={
                    formData.timelineFlexibility === "fixed"
                      ? "Strict / Fixed Dates"
                      : "Flexible Window"
                  }
                />
              </>
            )}

            {formData.category === "performer" && (
              <>
                <SummaryRow
                  label="Performance Type"
                  value={formData.performanceType}
                  highlight
                />
                <SummaryRow
                  label="Act Duration"
                  value={`${formData.durationMinutes} minutes`}
                />
                <SummaryRow
                  label="Audience Scale"
                  value={`${Number(formData.audienceSize).toLocaleString()} attendees`}
                />
                <SummaryRow
                  label="Sound Gear Provided"
                  value={formData.equipmentProvided}
                />
                {formData.genrePreference && (
                  <SummaryRow
                    label="Genre Preference"
                    value={formData.genrePreference}
                  />
                )}
              </>
            )}

            {formData.category === "crew" && (
              <>
                <SummaryRow
                  label="Specialization"
                  value={formData.crewType}
                  highlight
                />
                <SummaryRow
                  label="Personnel Headcount"
                  value={`${formData.numberOfCrew} crew members`}
                />
                <SummaryRow
                  label="Shift Window"
                  value={`${formData.shiftStart.replace("T", " ")} → ${formData.shiftEnd.replace("T", " ")}`}
                />
                <SummaryRow
                  label="Special PPE / Equipment"
                  value={formData.equipmentRequired}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex gap-4 mt-9">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/[0.04] rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:opacity-40 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-rose-600 via-crimson-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl py-3.5 shadow-[0_4px_25px_rgba(225,29,72,0.5)] transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Submitting to Database...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Confirm & Post Requirement</span>
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
}
