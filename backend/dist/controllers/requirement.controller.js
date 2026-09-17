"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequirement = exports.getRequirementById = exports.getRequirements = exports.createRequirement = void 0;
const Requirement_1 = __importDefault(require("../models/Requirement"));
const requirement_schema_1 = require("../schemas/requirement.schema");
const createRequirement = async (req, res, next) => {
    try {
        const parsed = requirement_schema_1.createRequirementSchema.parse(req.body);
        const doc = await Requirement_1.default.create(parsed);
        res.status(201).json({ success: true, data: doc });
    }
    catch (err) {
        next(err);
    }
};
exports.createRequirement = createRequirement;
const getRequirements = async (req, res, next) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const docs = await Requirement_1.default.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: docs });
    }
    catch (err) {
        next(err);
    }
};
exports.getRequirements = getRequirements;
const getRequirementById = async (req, res, next) => {
    try {
        const doc = await Requirement_1.default.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ success: false, message: "Requirement not found" });
        }
        res.status(200).json({ success: true, data: doc });
    }
    catch (err) {
        next(err);
    }
};
exports.getRequirementById = getRequirementById;
const deleteRequirement = async (req, res, next) => {
    try {
        const doc = await Requirement_1.default.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).json({ success: false, message: "Requirement not found" });
        }
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteRequirement = deleteRequirement;
//# sourceMappingURL=requirement.controller.js.map