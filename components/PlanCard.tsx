import Link from "next/link";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TravelPlan } from "@/types";

type PlanCardProps = {
  plan: TravelPlan;
  onDelete: (id: string) => void;
};

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

export function PlanCard({ plan, onDelete }: PlanCardProps) {
  const savedAt = plan.updatedAt || plan.createdAt;

  function handleDelete() {
    if (!window.confirm(`确定删除「${plan.title}」吗？`)) {
      return;
    }

    onDelete(plan.id);
  }

  return (
    <Card className="h-full transition-colors hover:border-primary/40 hover:bg-accent/30">
      <Link
        href={`/plans/${encodeURIComponent(plan.id)}`}
        className="block flex-1 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        aria-label={`查看计划：${plan.title}`}
      >
        <CardHeader>
          <CardTitle className="text-lg leading-6">{plan.title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MapPin className="size-4" aria-hidden="true" />
            {plan.destination}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">旅行天数</dt>
              <dd className="mt-1 font-medium text-foreground">
                {plan.totalDays} 天
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden="true" />
                更新时间
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                {formatDate(savedAt)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Link>

      <CardFooter className="justify-end border-t">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 aria-hidden="true" />
          删除
        </Button>
      </CardFooter>
    </Card>
  );
}
