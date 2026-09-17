import mongoose, { Document } from "mongoose";
export interface IRequirement extends Document {
    eventName: string;
    eventType: string;
    startDate: Date;
    endDate?: Date;
    location: string;
    venue?: string;
    category: "planner" | "performer" | "crew";
    details: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IRequirement, {}, {}, {}, mongoose.Document<unknown, {}, IRequirement, {}, {}> & IRequirement & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Requirement.d.ts.map