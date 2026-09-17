"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCategorySchema = exports.createRequirementSchema = void 0;
const zod_1 = require("zod");
const eventBasicsSchema = zod_1.z.object({
    eventName: zod_1.z.string().min(1, "Event name is required"),
    eventType: zod_1.z.string().min(1, "Event type is required"),
    startDate: zod_1.z.string().min(1, "Start date is required"),
    endDate: zod_1.z.string().optional(),
    location: zod_1.z.string().min(1, "Location is required"),
    venue: zod_1.z.string().optional(),
});
const plannerDetailsSchema = zod_1.z.object({
    budgetMin: zod_1.z.number().nonnegative("Budget min must be non-negative"),
    budgetMax: zod_1.z.number().nonnegative("Budget max must be non-negative"),
    attendeeCount: zod_1.z.number().int().positive("Attendee count must be a positive integer"),
    servicesNeeded: zod_1.z.array(zod_1.z.string()).min(1, "At least one service is needed"),
    timelineFlexibility: zod_1.z.enum(["fixed", "flexible"]),
});
const performerDetailsSchema = zod_1.z.object({
    performanceType: zod_1.z.string().min(1, "Performance type is required"),
    durationMinutes: zod_1.z.number().int().positive("Duration must be a positive integer"),
    audienceSize: zod_1.z.number().int().positive("Audience size must be a positive integer"),
    equipmentProvided: zod_1.z.boolean(),
    genrePreference: zod_1.z.string().optional(),
});
const crewDetailsSchema = zod_1.z.object({
    crewType: zod_1.z.string().min(1, "Crew type is required"),
    numberOfCrew: zod_1.z.number().int().positive("Number of crew must be a positive integer"),
    shiftStart: zod_1.z.string().min(1, "Shift start is required"),
    shiftEnd: zod_1.z.string().min(1, "Shift end is required"),
    equipmentRequired: zod_1.z.boolean(),
});
exports.createRequirementSchema = zod_1.z.discriminatedUnion("category", [
    zod_1.z.object({ category: zod_1.z.literal("planner"), details: plannerDetailsSchema }).merge(eventBasicsSchema),
    zod_1.z.object({ category: zod_1.z.literal("performer"), details: performerDetailsSchema }).merge(eventBasicsSchema),
    zod_1.z.object({ category: zod_1.z.literal("crew"), details: crewDetailsSchema }).merge(eventBasicsSchema),
]);
exports.queryCategorySchema = zod_1.z.object({
    category: zod_1.z.enum(["planner", "performer", "crew"]).optional(),
});
//# sourceMappingURL=requirement.schema.js.map