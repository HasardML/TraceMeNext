import { DayCard } from "@/components/plan/DayCard";
import type { TravelDay } from "@/types";

type DayListProps = {
  days: TravelDay[];
  currency: string;
};

export function DayList({ days, currency }: DayListProps) {
  return (
    <section className="space-y-4" aria-labelledby="daily-plan-title">
      <h2 id="daily-plan-title" className="text-xl font-semibold">
        每日行程
      </h2>

      <div className="space-y-4">
        {days.map((day) => (
          <DayCard key={day.day} day={day} currency={currency} />
        ))}
      </div>
    </section>
  );
}
