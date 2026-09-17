import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
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
      message: `Invalid ID format for field '${err.path}'`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.keys(err.errors || {}).map((key) => ({
      path: key,
      message: err.errors[key].message,
    }));
    return res.status(400).json({
      success: false,
      message: "Database schema validation failed",
      errors,
    });
  }

  if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON payload in request body",
    });
  }

  console.error(`[Unhandled Error] ${req.method} ${req.url}:`, err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
