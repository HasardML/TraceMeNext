import { BudgetCard } from "@/components/plan/BudgetCard";
import { DayList } from "@/components/plan/DayList";
import { PackingList } from "@/components/plan/PackingList";
import { PlanOverview } from "@/components/plan/PlanOverview";
import { TipsCard } from "@/components/plan/TipsCard";
import type { TravelPlan } from "@/types";

type TravelPlanViewProps = {
  plan: TravelPlan;
};

export function TravelPlanView({ plan }: TravelPlanViewProps) {
  return (
    <>
      <PlanOverview plan={plan} />
      <DayList days={plan.days} currency={plan.currency} />
      <BudgetCard budget={plan.budget} currency={plan.currency} />
      <PackingList packingList={plan.packingList} />
      <TipsCard tips={plan.tips} />
    </>
  );
}
