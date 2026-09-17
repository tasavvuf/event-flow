import { Request, Response, NextFunction } from "express";
import { RequirementService } from "../services/requirement.service";
import { sendSuccess } from "../utils/response";

export const createRequirement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await RequirementService.createRequirement(req.body);
    return sendSuccess(res, doc, 201);
  } catch (err) {
    next(err);
  }
};

export const getRequirements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const docs = await RequirementService.getRequirements(category as string | undefined);
    return sendSuccess(res, docs, 200);
  } catch (err) {
    next(err);
  }
};

export const getRequirementById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const doc = await RequirementService.getRequirementById(id);
    return sendSuccess(res, doc, 200);
  } catch (err) {
    next(err);
  }
};

export const deleteRequirement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await RequirementService.deleteRequirement(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
