"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requirement_controller_1 = require("../controllers/requirement.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/requirements:
 *   post:
 *     tags: [Requirements]
 *     summary: Create a new event requirement
 *     description: |
 *       Creates a new event requirement. The `category` field determines which
 *       detail schema is validated:
 *       - **planner**: requires budgetMin, budgetMax, attendeeCount, servicesNeeded, timelineFlexibility
 *       - **performer**: requires performanceType, durationMinutes, audienceSize, equipmentProvided
 *       - **crew**: requires crewType, numberOfCrew, shiftStart, shiftEnd, equipmentRequired
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/PlannerRequirement'
 *               - $ref: '#/components/schemas/PerformerRequirement'
 *               - $ref: '#/components/schemas/CrewRequirement'
 *           examples:
 *             planner:
 *               summary: Planner Requirement
 *               value:
 *                 eventName: "Riya & Aman Wedding"
 *                 eventType: "Wedding"
 *                 startDate: "2026-12-05"
 *                 endDate: "2026-12-07"
 *                 location: "Ahmedabad, Gujarat"
 *                 venue: "The Grand Bhagwati"
 *                 category: "planner"
 *                 details:
 *                   budgetMin: 500000
 *                   budgetMax: 800000
 *                   attendeeCount: 300
 *                   servicesNeeded: ["decor", "catering", "logistics"]
 *                   timelineFlexibility: "flexible"
 *             performer:
 *               summary: Performer Requirement
 *               value:
 *                 eventName: "TechCorp Annual Gala"
 *                 eventType: "Corporate"
 *                 startDate: "2026-11-20"
 *                 location: "Mumbai, Maharashtra"
 *                 venue: "Jio World Centre"
 *                 category: "performer"
 *                 details:
 *                   performanceType: "Music"
 *                   durationMinutes: 60
 *                   audienceSize: 500
 *                   equipmentProvided: true
 *                   genrePreference: "Bollywood"
 *             crew:
 *               summary: Crew Requirement
 *               value:
 *                 eventName: "Sunburn Festival 2026"
 *                 eventType: "Concert"
 *                 startDate: "2026-12-28"
 *                 endDate: "2026-12-30"
 *                 location: "Goa, India"
 *                 venue: "Vagator Beach"
 *                 category: "crew"
 *                 details:
 *                   crewType: "Sound"
 *                   numberOfCrew: 4
 *                   shiftStart: "2026-12-28T08:00:00.000Z"
 *                   shiftEnd: "2026-12-28T20:00:00.000Z"
 *                   equipmentRequired: true
 *     responses:
 *       201:
 *         description: Requirement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PlannerRequirement'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
router.post("/", requirement_controller_1.createRequirement);
/**
 * @swagger
 * /api/requirements:
 *   get:
 *     tags: [Requirements]
 *     summary: List all event requirements
 *     description: Returns all requirements, optionally filtered by category.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [planner, performer, crew]
 *         description: Filter requirements by category
 *         example: planner
 *     responses:
 *       200:
 *         description: List of requirements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     oneOf:
 *                       - $ref: '#/components/schemas/PlannerRequirement'
 *                       - $ref: '#/components/schemas/PerformerRequirement'
 *                       - $ref: '#/components/schemas/CrewRequirement'
 *       500:
 *         description: Internal server error
 */
router.get("/", requirement_controller_1.getRequirements);
/**
 * @swagger
 * /api/requirements/{id}:
 *   get:
 *     tags: [Requirements]
 *     summary: Get a requirement by ID
 *     description: Returns a single requirement by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the requirement
 *         example: 66f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Requirement found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/PlannerRequirement'
 *                     - $ref: '#/components/schemas/PerformerRequirement'
 *                     - $ref: '#/components/schemas/CrewRequirement'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Requirement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Requirement not found"
 */
router.get("/:id", requirement_controller_1.getRequirementById);
/**
 * @swagger
 * /api/requirements/{id}:
 *   delete:
 *     tags: [Requirements]
 *     summary: Delete a requirement
 *     description: Deletes a requirement by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the requirement
 *         example: 66f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       204:
 *         description: Requirement deleted successfully
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Requirement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Requirement not found"
 */
router.delete("/:id", requirement_controller_1.deleteRequirement);
exports.default = router;
//# sourceMappingURL=requirement.routes.js.map