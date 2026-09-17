export type EventCategory = "planner" | "performer" | "crew";

export interface EventBasics {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: EventCategory;
}

export interface PlannerDetails {
  budgetMin: number;
  budgetMax: number;
  attendeeCount: number;
  servicesNeeded: string[];
  timelineFlexibility: "fixed" | "flexible";
}

export interface PerformerDetails {
  performanceType: string;
  durationMinutes: number;
  audienceSize: number;
  equipmentProvided: boolean;
  genrePreference?: string;
}

export interface CrewDetails {
  crewType: string;
  numberOfCrew: number;
  shiftStart: string;
  shiftEnd: string;
  equipmentRequired: boolean;
}

export type RequirementDetails =
  | { category: "planner"; details: PlannerDetails }
  | { category: "performer"; details: PerformerDetails }
  | { category: "crew"; details: CrewDetails };

export interface Requirement extends EventBasics {
  _id?: string;
  details: PlannerDetails | PerformerDetails | CrewDetails;
  createdAt?: string;
  updatedAt?: string;
}
