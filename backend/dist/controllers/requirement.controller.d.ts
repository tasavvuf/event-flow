import { Request, Response, NextFunction } from "express";
export declare const createRequirement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRequirements: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRequirementById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteRequirement: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=requirement.controller.d.ts.map