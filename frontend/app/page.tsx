"use client";

import { useState } from "react";
import Link from "next/link";
import StepBasics from "@/components/StepBasics";
import StepCategoryScope from "@/components/StepCategoryScope";
import StepCategoryLogistics from "@/components/StepCategoryLogistics";
import StepReview from "@/components/StepReview";
import GlassCard from "@/components/GlassCard";
import { createRequirement, RequirementItem } from "@/lib/api";
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ListFilter } from "lucide-react";

const initialFormData = {
  eventName: "",
  eventType: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "planner",
  // Planner fields
  budgetMin: "",
  budgetMax: "",
  attendeeCount: "",
  servicesNeeded: [] as string[],
  timelineFlexibility: "flexible",
  // Performer fields
  performanceType: "",
  durationMinutes: "",
  audienceSize: "",
  equipmentProvided: true,
  genrePreference: "",
  // Crew fields
  crewType: "",
  numberOfCrew: "",
  shiftStart: "",
  shiftEnd: "",
  equipmentRequired: false,
};

function buildPayload(data: typeof initialFormData) {
  const base = {
    eventName: data.eventName.trim(),
    eventType: data.eventType.trim(),
    startDate: new Date(data.startDate).toISOString(),
    endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
    location: data.location.trim(),
    venue: data.venue.trim() || undefined,
    category: data.category as "planner" | "performer" | "crew",
  };

  if (data.category === "planner") {
    return {
      ...base,
      details: {
        budgetMin: Number(data.budgetMin),
        budgetMax: Number(data.budgetMax),
        attendeeCount: Number(data.attendeeCount),
        servicesNeeded: data.servicesNeeded,
        timelineFlexibility: data.timelineFlexibility as "fixed" | "flexible",
      },
    };
  }

  if (data.category === "performer") {
    return {
      ...base,
      details: {
        performanceType: data.performanceType.trim(),
        durationMinutes: Number(data.durationMinutes),
        audienceSize: Number(data.audienceSize),
        equipmentProvided: Boolean(data.equipmentProvided),
        genrePreference: data.genrePreference.trim() || undefined,
      },
    };
  }

  // crew
  return {
    ...base,
    details: {
      crewType: data.crewType.trim(),
      numberOfCrew: Number(data.numberOfCrew),
      shiftStart: new Date(data.shiftStart).toISOString(),
      shiftEnd: new Date(data.shiftEnd).toISOString(),
      equipmentRequired: Boolean(data.equipmentRequired),
    },
  };
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdRequirement, setCreatedRequirement] = useState<RequirementItem | null>(null);

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = buildPayload(formData);
      const res = await createRequirement(payload);
      setCreatedRequirement(res);
      setSubmitStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong while posting your requirement.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setSubmitStatus("idle");
    setErrorMessage("");
    setCreatedRequirement(null);
  };

  return (
    <div className="w-full">
      {/* SUCCESS STATE */}
      {submitStatus === "success" && (
        <GlassCard badgeLeft="STATUS • 201 CREATED" badgeRight="DATABASE PERSISTED">
          <div className="text-center py-6 md:py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-rose-400" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-3">
              {formData.category} requirement live
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Requirement Submitted!
            </h1>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
              Your requirement for <strong className="text-white font-semibold">"{formData.eventName}"</strong> has been saved to MongoDB and categorized under{" "}
              <span className="text-rose-400 font-semibold uppercase">{formData.category}</span>.
            </p>

            {createdRequirement && (
              <div className="mb-8 p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto text-xs text-white/50 font-mono">
                ID: {createdRequirement._id}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link
                href="/events"
                className="flex-1 bg-gradient-to-r from-rose-600 via-crimson-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl px-6 py-3.5 shadow-lg shadow-rose-950/50 transition-all flex items-center justify-center gap-2"
              >
                <ListFilter className="w-4 h-4" />
                <span>View in Events Directory</span>
              </Link>
              <button
                onClick={resetForm}
                className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/[0.05] font-semibold rounded-xl px-6 py-3.5 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Post Another</span>
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* ERROR STATE */}
      {submitStatus === "error" && (
        <GlassCard badgeLeft="ERROR ENCOUNTERED" badgeRight="VALIDATION / BACKEND">
          <div className="text-center py-6 md:py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.4)]">
              <AlertCircle className="w-10 h-10 text-rose-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
              Submission Failed
            </h1>
            <div className="max-w-md mx-auto p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs text-left mb-6 font-mono overflow-auto">
              {errorMessage}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSubmitStatus("idle")}
                className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl px-6 py-3 transition-all"
              >
                Return to Review
              </button>
              <button
                onClick={resetForm}
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-xl px-6 py-3 transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* STEP 1: BASICS */}
      {submitStatus === "idle" && step === 1 && (
        <StepBasics
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
        />
      )}

      {/* STEP 2: CATEGORY SCOPE (ADAPTS TO CATEGORY) */}
      {submitStatus === "idle" && step === 2 && (
        <StepCategoryScope
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {/* STEP 3: CATEGORY LOGISTICS (ADAPTS TO CATEGORY) */}
      {submitStatus === "idle" && step === 3 && (
        <StepCategoryLogistics
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {/* STEP 4: REVIEW & SUBMISSION */}
      {submitStatus === "idle" && step === 4 && (
        <StepReview
          formData={formData}
          onBack={prevStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
