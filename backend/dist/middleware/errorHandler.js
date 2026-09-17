"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
        });
    }
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map