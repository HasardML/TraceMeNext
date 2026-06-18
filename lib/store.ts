import { z } from "zod";

import { TravelPlanSchema, type TravelPlan } from "@/types";

export const TRAVEL_PLANS_STORAGE_KEY = "travel-plans";

const TravelPlansSchema = z.array(TravelPlanSchema);

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readPlans(): TravelPlan[] {
  const storage = getLocalStorage();

  if (!storage) {
    return [];
  }

  try {
    const rawPlans = storage.getItem(TRAVEL_PLANS_STORAGE_KEY);

    if (!rawPlans) {
      return [];
    }

    const plans = TravelPlansSchema.parse(JSON.parse(rawPlans));

    try {
      storage.setItem(TRAVEL_PLANS_STORAGE_KEY, JSON.stringify(plans));
    } catch {
      // Reading should still succeed if migration persistence is unavailable.
    }

    return plans;
  } catch {
    return [];
  }
}

function writePlans(plans: TravelPlan[]): boolean {
  const storage = getLocalStorage();

  if (!storage) {
    return false;
  }

  try {
    storage.setItem(TRAVEL_PLANS_STORAGE_KEY, JSON.stringify(plans));
    return true;
  } catch {
    return false;
  }
}

function getUpdatedAtTime(plan: TravelPlan): number {
  const timestamp = Date.parse(plan.updatedAt);

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function savePlan(plan: TravelPlan): void {
  const parsedPlan = normalizeTravelPlan(plan);
  const plans = readPlans();
  const planIndex = plans.findIndex(
    (storedPlan) => storedPlan.id === parsedPlan.id,
  );
  const nextPlan =
    planIndex >= 0
      ? { ...parsedPlan, updatedAt: new Date().toISOString() }
      : parsedPlan;

  if (planIndex >= 0) {
    plans[planIndex] = nextPlan;
  } else {
    plans.push(nextPlan);
  }

  writePlans(plans);
}

export function normalizeTravelPlan(plan: unknown): TravelPlan {
  return TravelPlanSchema.parse(plan);
}

export function getPlan(id: string): TravelPlan | null {
  return readPlans().find((plan) => plan.id === id) ?? null;
}

export function getAllPlans(): TravelPlan[] {
  return [...readPlans()].sort(
    (planA, planB) => getUpdatedAtTime(planB) - getUpdatedAtTime(planA),
  );
}

export function deletePlan(id: string): void {
  writePlans(readPlans().filter((plan) => plan.id !== id));
}

export function updatePlan(
  id: string,
  updates: Partial<TravelPlan>,
): TravelPlan | null {
  const plans = readPlans();
  const planIndex = plans.findIndex((plan) => plan.id === id);

  if (planIndex < 0) {
    return null;
  }

  const currentPlan = plans[planIndex];
  const updatedPlan = TravelPlanSchema.parse({
    ...currentPlan,
    ...updates,
    id: currentPlan.id,
    updatedAt: new Date().toISOString(),
  });

  plans[planIndex] = updatedPlan;

  if (!writePlans(plans)) {
    return null;
  }

  return updatedPlan;
}
