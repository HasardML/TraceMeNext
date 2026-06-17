import { DayCard } from "@/components/plan/DayCard";
import type { TravelDay, TravelItem } from "@/types";

type DayListProps = {
  days: TravelDay[];
  currency: string;
  onThemeSave?: (dayNumber: number, theme: string) => void;
  onItemSave?: (
    dayNumber: number,
    itemIndex: number,
    item: TravelItem,
  ) => boolean | void;
};

export function DayList({
  days,
  currency,
  onThemeSave,
  onItemSave,
}: DayListProps) {
  return (
    <section className="space-y-4" aria-labelledby="daily-plan-title">
      <h2 id="daily-plan-title" className="text-xl font-semibold">
        每日行程
      </h2>

      <div className="space-y-4">
        {days.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            currency={currency}
            onThemeSave={onThemeSave}
            onItemSave={onItemSave}
          />
        ))}
      </div>
    </section>
  );
}
