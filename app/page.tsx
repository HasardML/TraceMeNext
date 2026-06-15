import { PlanOverview } from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { mockTravelPlan } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section className="lg:sticky lg:top-6 lg:self-start">
          <TravelForm />
        </section>

        <section className="lg:col-span-2">
          <PlanOverview plan={mockTravelPlan} />
        </section>
      </div>
    </main>
  );
}
