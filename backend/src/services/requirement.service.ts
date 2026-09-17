import Requirement, { IRequirement } from "../models/Requirement";
import { CreateRequirementInput } from "../schemas/requirement.schema";
import { AppError } from "../utils/AppError";

export class RequirementService {
  static async createRequirement(input: CreateRequirementInput): Promise<IRequirement> {
    const requirement = new Requirement(input);
    return await requirement.save();
  }

  static async getRequirements(category?: string): Promise<IRequirement[]> {
    const filter = category ? { category } : {};
    return await Requirement.find(filter).sort({ createdAt: -1 });
  }

  static async getRequirementById(id: string): Promise<IRequirement> {
    const requirement = await Requirement.findById(id);
    if (!requirement) {
      throw AppError.notFound(`Requirement with ID '${id}' not found`);
    }
    return requirement;
  }

  static async deleteRequirement(id: string): Promise<void> {
    const requirement = await Requirement.findByIdAndDelete(id);
    if (!requirement) {
      throw AppError.notFound(`Requirement with ID '${id}' not found`);
    }
  }
}
