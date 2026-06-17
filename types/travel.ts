import { z } from "zod";

export const TravelItemSchema = z.object({
  time: z.string(),
  place: z.string(),
  type: z.enum(["attraction", "food", "transport", "hotel", "shopping", "rest"]),
  description: z.string(),
  cost: z.number().optional(),
});

export const TravelDaySchema = z.object({
  day: z.number(),
  theme: z.string(),
  items: z.array(TravelItemSchema),
});

export const BudgetSchema = z.object({
  transport: z.number(),
  accommodation: z.number(),
  food: z.number(),
  tickets: z.number(),
  shopping: z.number(),
  other: z.number(),
  total: z.number(),
});

export const TravelInputSchema = z.object({
  destination: z.string().min(1),
  departureCity: z.string().optional(),
  startDate: z.string().optional(),
  days: z.number().int().min(1).max(30).default(5),
  travelers: z.number().int().min(1).max(10).default(1),
  budget: z.number().min(0).optional(),
  currency: z.string().default("CNY"),
  travelType: z.enum(["solo", "couple", "family", "friends"]).optional(),
  preferences: z.array(z.string()).default([]),
  pace: z.enum(["relaxed", "moderate", "intensive"]).optional(),
  specialRequests: z.string().optional(),
});

export const TravelPlanSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  destination: z.string(),
  totalDays: z.number(),
  totalBudget: z.number(),
  currency: z.string(),
  days: z.array(TravelDaySchema),
  budget: BudgetSchema,
  packingList: z.array(z.string()),
  tips: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  inputParams: TravelInputSchema.optional(),
});

export const AiOutputSchema = TravelPlanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  inputParams: true,
});

export type TravelItem = z.infer<typeof TravelItemSchema>;
export type TravelDay = z.infer<typeof TravelDaySchema>;
export type Budget = z.infer<typeof BudgetSchema>;
export type TravelInput = z.infer<typeof TravelInputSchema>;
export type AiOutput = z.infer<typeof AiOutputSchema>;
export type TravelPlan = z.infer<typeof TravelPlanSchema>;
