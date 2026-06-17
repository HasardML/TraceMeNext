import { Plus } from "lucide-react";

import { DayCard } from "@/components/plan/DayCard";
import { Button } from "@/components/ui/button";
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
  onItemAdd?: (dayNumber: number, item: TravelItem) => boolean | void;
  onItemDelete?: (dayNumber: number, itemIndex: number) => boolean | void;
  onDayAdd?: () => void;
  onDayDelete?: (dayNumber: number) => boolean | void;
};

export function DayList({
  days,
  currency,
  onThemeSave,
  onItemSave,
  onItemAdd,
  onItemDelete,
  onDayAdd,
  onDayDelete,
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
            onItemAdd={onItemAdd}
            onItemDelete={onItemDelete}
            onDayDelete={onDayDelete}
            canDeleteDay={days.length > 1}
          />
        ))}
      </div>

      {onDayAdd ? (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onDayAdd}
        >
          <Plus aria-hidden="true" />
          添加一天
        </Button>
      ) : null}
    </section>
  );
}
