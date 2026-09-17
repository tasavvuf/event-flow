import { z } from "zod";

const isoDateOrDateString = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format. Expected valid ISO date or date-time string",
});

const eventBasicsSchema = z.object({
  eventName: z.string().trim().min(1, "Event name is required"),
  eventType: z.string().trim().min(1, "Event type is required"),
  startDate: isoDateOrDateString,
  endDate: isoDateOrDateString.optional(),
  location: z.string().trim().min(1, "Location is required"),
  venue: z.string().trim().optional(),
});

const plannerDetailsSchema = z
  .object({
    budgetMin: z.number().nonnegative("Budget min must be non-negative"),
    budgetMax: z.number().nonnegative("Budget max must be non-negative"),
    attendeeCount: z.number().int().positive("Attendee count must be a positive integer"),
    servicesNeeded: z.array(z.string().trim().min(1)).min(1, "At least one service is required"),
    timelineFlexibility: z.enum(["fixed", "flexible"]),
  })
  .refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["budgetMax"],
  });

const performerDetailsSchema = z.object({
  performanceType: z.string().trim().min(1, "Performance type is required"),
  durationMinutes: z.number().int().positive("Duration must be a positive integer in minutes"),
  audienceSize: z.number().int().positive("Audience size must be a positive integer"),
  equipmentProvided: z.boolean(),
  genrePreference: z.string().trim().optional(),
});

const crewDetailsSchema = z
  .object({
    crewType: z.string().trim().min(1, "Crew type is required"),
    numberOfCrew: z.number().int().positive("Number of crew must be a positive integer"),
    shiftStart: isoDateOrDateString,
    shiftEnd: isoDateOrDateString,
    equipmentRequired: z.boolean(),
  })
  .refine((data) => new Date(data.shiftEnd) > new Date(data.shiftStart), {
    message: "Shift end time must be after shift start time",
    path: ["shiftEnd"],
  });

export const createRequirementSchema = z
  .discriminatedUnion("category", [
    z.object({ category: z.literal("planner"), details: plannerDetailsSchema }).merge(eventBasicsSchema),
    z.object({ category: z.literal("performer"), details: performerDetailsSchema }).merge(eventBasicsSchema),
    z.object({ category: z.literal("crew"), details: crewDetailsSchema }).merge(eventBasicsSchema),
  ])
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

export const queryCategorySchema = z.object({
  category: z.enum(["planner", "performer", "crew"]).optional(),
});

export type CreateRequirementInput = z.infer<typeof createRequirementSchema>;
