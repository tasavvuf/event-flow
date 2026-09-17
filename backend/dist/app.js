"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const requirement_routes_1 = __importDefault(require("./routes/requirement.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event Requirements API",
            version: "1.0.0",
            description: "API for managing event requirements across planner, performer, and crew categories. " +
                "Supports creating, listing, retrieving, and deleting event requirements with " +
                "category-specific validation using Zod schemas.",
            contact: {
                name: "API Support",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                PlannerDetails: {
                    type: "object",
                    required: ["budgetMin", "budgetMax", "attendeeCount", "servicesNeeded", "timelineFlexibility"],
                    properties: {
                        budgetMin: {
                            type: "number",
                            minimum: 0,
                            description: "Minimum budget in local currency",
                            example: 500000,
                        },
                        budgetMax: {
                            type: "number",
                            minimum: 0,
                            description: "Maximum budget in local currency",
                            example: 800000,
                        },
                        attendeeCount: {
                            type: "integer",
                            minimum: 1,
                            description: "Expected number of attendees",
                            example: 300,
                        },
                        servicesNeeded: {
                            type: "array",
                            items: { type: "string" },
                            minItems: 1,
                            description: "List of services required (e.g. decor, catering, logistics)",
                            example: ["decor", "catering", "logistics"],
                        },
                        timelineFlexibility: {
                            type: "string",
                            enum: ["fixed", "flexible"],
                            description: "Whether the event timeline is fixed or flexible",
                            example: "flexible",
                        },
                    },
                },
                PerformerDetails: {
                    type: "object",
                    required: ["performanceType", "durationMinutes", "audienceSize", "equipmentProvided"],
                    properties: {
                        performanceType: {
                            type: "string",
                            minLength: 1,
                            description: "Type of performance (e.g. Music, Dance, Comedy, Magic)",
                            example: "Music",
                        },
                        durationMinutes: {
                            type: "integer",
                            minimum: 1,
                            description: "Performance duration in minutes",
                            example: 60,
                        },
                        audienceSize: {
                            type: "integer",
                            minimum: 1,
                            description: "Expected audience size",
                            example: 500,
                        },
                        equipmentProvided: {
                            type: "boolean",
                            description: "Whether the venue provides equipment",
                            example: true,
                        },
                        genrePreference: {
                            type: "string",
                            description: "Preferred genre for the performance (optional)",
                            example: "Bollywood",
                        },
                    },
                },
                CrewDetails: {
                    type: "object",
                    required: ["crewType", "numberOfCrew", "shiftStart", "shiftEnd", "equipmentRequired"],
                    properties: {
                        crewType: {
                            type: "string",
                            minLength: 1,
                            description: "Type of crew needed (e.g. Sound, Lighting, Photography, Security)",
                            example: "Sound",
                        },
                        numberOfCrew: {
                            type: "integer",
                            minimum: 1,
                            description: "Number of crew members required",
                            example: 4,
                        },
                        shiftStart: {
                            type: "string",
                            description: "Shift start time in ISO datetime format",
                            example: "2026-12-05T08:00:00.000Z",
                        },
                        shiftEnd: {
                            type: "string",
                            description: "Shift end time in ISO datetime format",
                            example: "2026-12-05T20:00:00.000Z",
                        },
                        equipmentRequired: {
                            type: "boolean",
                            description: "Whether crew needs to bring their own equipment",
                            example: true,
                        },
                    },
                },
                PlannerRequirement: {
                    type: "object",
                    required: ["eventName", "eventType", "startDate", "location", "category", "details"],
                    properties: {
                        eventName: {
                            type: "string",
                            minLength: 1,
                            description: "Name of the event",
                            example: "Riya & Aman Wedding",
                        },
                        eventType: {
                            type: "string",
                            minLength: 1,
                            description: "Type of event (e.g. Wedding, Corporate, Birthday, Concert)",
                            example: "Wedding",
                        },
                        startDate: {
                            type: "string",
                            description: "Event start date in ISO date format",
                            example: "2026-12-05",
                        },
                        endDate: {
                            type: "string",
                            description: "Event end date in ISO date format (optional)",
                            example: "2026-12-07",
                        },
                        location: {
                            type: "string",
                            minLength: 1,
                            description: "Event location (city, state)",
                            example: "Ahmedabad, Gujarat",
                        },
                        venue: {
                            type: "string",
                            description: "Event venue name (optional)",
                            example: "The Grand Bhagwati",
                        },
                        category: {
                            type: "string",
                            enum: ["planner"],
                            description: "Event category - must be 'planner'",
                            example: "planner",
                        },
                        details: {
                            $ref: "#/components/schemas/PlannerDetails",
                        },
                    },
                },
                PerformerRequirement: {
                    type: "object",
                    required: ["eventName", "eventType", "startDate", "location", "category", "details"],
                    properties: {
                        eventName: {
                            type: "string",
                            minLength: 1,
                            description: "Name of the event",
                            example: "TechCorp Annual Gala",
                        },
                        eventType: {
                            type: "string",
                            minLength: 1,
                            description: "Type of event",
                            example: "Corporate",
                        },
                        startDate: {
                            type: "string",
                            description: "Event start date in ISO date format",
                            example: "2026-11-20",
                        },
                        endDate: {
                            type: "string",
                            description: "Event end date in ISO date format (optional)",
                        },
                        location: {
                            type: "string",
                            minLength: 1,
                            description: "Event location",
                            example: "Mumbai, Maharashtra",
                        },
                        venue: {
                            type: "string",
                            description: "Event venue name (optional)",
                            example: "Jio World Centre",
                        },
                        category: {
                            type: "string",
                            enum: ["performer"],
                            description: "Event category - must be 'performer'",
                            example: "performer",
                        },
                        details: {
                            $ref: "#/components/schemas/PerformerDetails",
                        },
                    },
                },
                CrewRequirement: {
                    type: "object",
                    required: ["eventName", "eventType", "startDate", "location", "category", "details"],
                    properties: {
                        eventName: {
                            type: "string",
                            minLength: 1,
                            description: "Name of the event",
                            example: "Sunburn Festival 2026",
                        },
                        eventType: {
                            type: "string",
                            minLength: 1,
                            description: "Type of event",
                            example: "Concert",
                        },
                        startDate: {
                            type: "string",
                            description: "Event start date in ISO date format",
                            example: "2026-12-28",
                        },
                        endDate: {
                            type: "string",
                            description: "Event end date in ISO date format (optional)",
                            example: "2026-12-30",
                        },
                        location: {
                            type: "string",
                            minLength: 1,
                            description: "Event location",
                            example: "Goa, India",
                        },
                        venue: {
                            type: "string",
                            description: "Event venue name (optional)",
                            example: "Vagator Beach",
                        },
                        category: {
                            type: "string",
                            enum: ["crew"],
                            description: "Event category - must be 'crew'",
                            example: "crew",
                        },
                        details: {
                            $ref: "#/components/schemas/CrewDetails",
                        },
                    },
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            description: "The returned data (document or array)",
                        },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            example: "Validation failed",
                        },
                        errors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    path: {
                                        type: "string",
                                        example: "details.attendeeCount",
                                    },
                                    message: {
                                        type: "string",
                                        example: "Expected number, received string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Event Requirements API Documentation",
}));
app.use("/api/requirements", requirement_routes_1.default);
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map