import {
  BudgetCard,
  DayList,
  PackingList,
  PlanOverview,
  TipsCard,
} from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { mockTravelPlan } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section className="lg:sticky lg:top-6 lg:self-start">
          <TravelForm />
        </section>

        <section className="space-y-6 lg:col-span-2">
          <PlanOverview plan={mockTravelPlan} />
          <DayList
            days={mockTravelPlan.days}
            currency={mockTravelPlan.currency}
          />
          <BudgetCard
            budget={mockTravelPlan.budget}
            currency={mockTravelPlan.currency}
          />
          <PackingList packingList={mockTravelPlan.packingList} />
          <TipsCard tips={mockTravelPlan.tips} />
        </section>
      </div>
    </main>
  );
}
