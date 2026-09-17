import { z } from "zod";
export declare const createRequirementSchema: z.ZodDiscriminatedUnion<"category", [z.ZodObject<{
    category: z.ZodLiteral<"planner">;
    details: z.ZodObject<{
        budgetMin: z.ZodNumber;
        budgetMax: z.ZodNumber;
        attendeeCount: z.ZodNumber;
        servicesNeeded: z.ZodArray<z.ZodString, "many">;
        timelineFlexibility: z.ZodEnum<["fixed", "flexible"]>;
    }, "strip", z.ZodTypeAny, {
        budgetMin: number;
        budgetMax: number;
        attendeeCount: number;
        servicesNeeded: string[];
        timelineFlexibility: "fixed" | "flexible";
    }, {
        budgetMin: number;
        budgetMax: number;
        attendeeCount: number;
        servicesNeeded: string[];
        timelineFlexibility: "fixed" | "flexible";
    }>;
} & {
    eventName: z.ZodString;
    eventType: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "planner";
    details: {
        budgetMin: number;
        budgetMax: number;
        attendeeCount: number;
        servicesNeeded: string[];
        timelineFlexibility: "fixed" | "flexible";
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "planner";
    details: {
        budgetMin: number;
        budgetMax: number;
        attendeeCount: number;
        servicesNeeded: string[];
        timelineFlexibility: "fixed" | "flexible";
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}>, z.ZodObject<{
    category: z.ZodLiteral<"performer">;
    details: z.ZodObject<{
        performanceType: z.ZodString;
        durationMinutes: z.ZodNumber;
        audienceSize: z.ZodNumber;
        equipmentProvided: z.ZodBoolean;
        genrePreference: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        performanceType: string;
        durationMinutes: number;
        audienceSize: number;
        equipmentProvided: boolean;
        genrePreference?: string | undefined;
    }, {
        performanceType: string;
        durationMinutes: number;
        audienceSize: number;
        equipmentProvided: boolean;
        genrePreference?: string | undefined;
    }>;
} & {
    eventName: z.ZodString;
    eventType: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "performer";
    details: {
        performanceType: string;
        durationMinutes: number;
        audienceSize: number;
        equipmentProvided: boolean;
        genrePreference?: string | undefined;
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "performer";
    details: {
        performanceType: string;
        durationMinutes: number;
        audienceSize: number;
        equipmentProvided: boolean;
        genrePreference?: string | undefined;
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}>, z.ZodObject<{
    category: z.ZodLiteral<"crew">;
    details: z.ZodObject<{
        crewType: z.ZodString;
        numberOfCrew: z.ZodNumber;
        shiftStart: z.ZodString;
        shiftEnd: z.ZodString;
        equipmentRequired: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        crewType: string;
        numberOfCrew: number;
        shiftStart: string;
        shiftEnd: string;
        equipmentRequired: boolean;
    }, {
        crewType: string;
        numberOfCrew: number;
        shiftStart: string;
        shiftEnd: string;
        equipmentRequired: boolean;
    }>;
} & {
    eventName: z.ZodString;
    eventType: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "crew";
    details: {
        crewType: string;
        numberOfCrew: number;
        shiftStart: string;
        shiftEnd: string;
        equipmentRequired: boolean;
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: string;
    startDate: string;
    location: string;
    category: "crew";
    details: {
        crewType: string;
        numberOfCrew: number;
        shiftStart: string;
        shiftEnd: string;
        equipmentRequired: boolean;
    };
    endDate?: string | undefined;
    venue?: string | undefined;
}>]>;
export declare const queryCategorySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<["planner", "performer", "crew"]>>;
}, "strip", z.ZodTypeAny, {
    category?: "planner" | "performer" | "crew" | undefined;
}, {
    category?: "planner" | "performer" | "crew" | undefined;
}>;
//# sourceMappingURL=requirement.schema.d.ts.map