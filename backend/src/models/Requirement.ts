import mongoose, { Schema, Document } from "mongoose";

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

const RequirementSchema = new Schema<IRequirement>(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["planner", "performer", "crew"],
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

RequirementSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model<IRequirement>("Requirement", RequirementSchema);
