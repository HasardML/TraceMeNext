import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TravelPlan } from "@/types";

type PlanOverviewProps = {
  plan: TravelPlan;
};

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const numberFormatter = new Intl.NumberFormat("zh-CN");

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

export function PlanOverview({ plan }: PlanOverviewProps) {
  const details = [
    { label: "目的地", value: plan.destination },
    { label: "旅行天数", value: `${plan.totalDays} 天` },
    {
      label: "预计预算",
      value: `${plan.currency} ${numberFormatter.format(plan.totalBudget)}`,
    },
    { label: "创建时间", value: formatDate(plan.createdAt) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{plan.title}</CardTitle>
        <CardDescription className="leading-6">{plan.summary}</CardDescription>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-md border border-border bg-background px-4 py-3"
            >
              <dt className="text-sm text-muted-foreground">{detail.label}</dt>
              <dd className="mt-1 text-base font-medium text-foreground">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
