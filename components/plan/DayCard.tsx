import {
  Coffee,
  Hotel,
  Landmark,
  ShoppingBag,
  Train,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TravelDay, TravelItem } from "@/types";

type DayCardProps = {
  day: TravelDay;
  currency: string;
};

type ItemTypeConfig = {
  label: string;
  icon: LucideIcon;
  className: string;
};

const itemTypeConfig: Record<TravelItem["type"], ItemTypeConfig> = {
  attraction: {
    label: "景点",
    icon: Landmark,
    className: "border-sky-200 bg-sky-50 text-sky-700",
  },
  food: {
    label: "餐饮",
    icon: Utensils,
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  transport: {
    label: "交通",
    icon: Train,
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  hotel: {
    label: "住宿",
    icon: Hotel,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  shopping: {
    label: "购物",
    icon: ShoppingBag,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  rest: {
    label: "休息",
    icon: Coffee,
    className: "border-teal-200 bg-teal-50 text-teal-700",
  },
};

const costFormatter = new Intl.NumberFormat("zh-CN");

function formatCost(cost: number, currency: string) {
  return `${currency} ${costFormatter.format(cost)}`;
}

export function DayCard({ day, currency }: DayCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-1 text-lg sm:flex-row sm:items-baseline sm:gap-3">
          <span>第 {day.day} 天</span>
          <span className="text-base font-medium text-muted-foreground">
            {day.theme}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ol className="space-y-4">
          {day.items.map((item, index) => {
            const config = itemTypeConfig[item.type];
            const Icon = config.icon;

            return (
              <li
                key={`${day.day}-${item.time}-${item.place}-${index}`}
                className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[4.5rem_1fr]"
              >
                <time className="text-sm font-semibold tabular-nums text-foreground">
                  {item.time}
                </time>

                <div className="min-w-0 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium",
                            config.className,
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {config.label}
                        </span>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.place}
                        </h3>
                      </div>
                    </div>

                    {item.cost !== undefined ? (
                      <span className="shrink-0 text-sm font-medium text-muted-foreground">
                        {formatCost(item.cost, currency)}
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
