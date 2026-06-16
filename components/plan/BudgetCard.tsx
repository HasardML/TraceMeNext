import {
  BedDouble,
  CircleEllipsis,
  ShoppingBag,
  Ticket,
  Train,
  Utensils,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Budget } from "@/types";

type BudgetCardProps = {
  budget: Budget;
  currency: string;
};

type BudgetCategoryKey = Exclude<keyof Budget, "total">;

type BudgetItem = {
  key: BudgetCategoryKey;
  label: string;
  icon: LucideIcon;
};

const budgetItems: BudgetItem[] = [
  { key: "transport", label: "交通", icon: Train },
  { key: "accommodation", label: "住宿", icon: BedDouble },
  { key: "food", label: "餐饮", icon: Utensils },
  { key: "tickets", label: "门票", icon: Ticket },
  { key: "shopping", label: "购物", icon: ShoppingBag },
  { key: "other", label: "其他", icon: CircleEllipsis },
];

const amountFormatter = new Intl.NumberFormat("zh-CN");

function formatAmount(amount: number, currency: string) {
  return `${currency} ${amountFormatter.format(amount)}`;
}

export function BudgetCard({ budget, currency }: BudgetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">预算明细</CardTitle>
        <CardDescription>按旅行主要开销分类展示预计花费。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <dl className="grid gap-3 sm:grid-cols-2">
          {budgetItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3"
              >
                <dt className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </dt>
                <dd className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {formatAmount(budget[item.key], currency)}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted px-4 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <WalletCards
              className="h-5 w-5 shrink-0 text-foreground"
              aria-hidden="true"
            />
            <span className="font-semibold text-foreground">合计预算</span>
          </div>
          <div className="shrink-0 text-lg font-semibold tabular-nums text-foreground">
            {formatAmount(budget.total, currency)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
