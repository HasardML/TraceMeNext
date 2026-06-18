"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Budget } from "@/types";

type BudgetCardProps = {
  budget: Budget;
  currency: string;
  onBudgetChange?: (budget: Budget) => void;
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

function createBudgetDraft(budget: Budget): Record<BudgetCategoryKey, string> {
  return budgetItems.reduce(
    (draft, item) => ({
      ...draft,
      [item.key]: String(budget[item.key]),
    }),
    {} as Record<BudgetCategoryKey, string>,
  );
}

function calculateBudget(
  values: Record<BudgetCategoryKey, number>,
): Budget {
  const total = budgetItems.reduce((sum, item) => sum + values[item.key], 0);

  return {
    ...values,
    total,
  };
}

function parseBudgetDraft(
  draft: Record<BudgetCategoryKey, string>,
): Record<BudgetCategoryKey, number> | null {
  return budgetItems.reduce<Record<BudgetCategoryKey, number> | null>(
    (values, item) => {
      if (!values) {
        return null;
      }

      const rawValue = draft[item.key].trim();

      if (!rawValue) {
        return null;
      }

      const amount = Number(rawValue);

      if (!Number.isFinite(amount) || amount < 0) {
        return null;
      }

      return {
        ...values,
        [item.key]: amount,
      };
    },
    {} as Record<BudgetCategoryKey, number>,
  );
}

export function BudgetCard({
  budget,
  currency,
  onBudgetChange,
}: BudgetCardProps) {
  const [draft, setDraft] = useState(createBudgetDraft(budget));
  const [budgetError, setBudgetError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(createBudgetDraft(budget));
  }, [budget]);

  function updateBudgetItem(key: BudgetCategoryKey, value: string) {
    const nextDraft = {
      ...draft,
      [key]: value,
    };

    setDraft(nextDraft);

    const parsedValues = parseBudgetDraft(nextDraft);

    if (!parsedValues) {
      setBudgetError("预算金额请输入数字。");
      return;
    }

    setBudgetError(null);
    onBudgetChange?.(calculateBudget(parsedValues));
  }

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
            const inputId = `budget-${item.key}`;

            return (
              <div
                key={item.key}
                className="grid gap-3 rounded-md border border-border bg-background px-4 py-3 sm:grid-cols-[1fr_10rem] sm:items-center"
              >
                <dt className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <Label htmlFor={inputId}>{item.label}</Label>
                </dt>
                <dd className="min-w-0">
                  {onBudgetChange ? (
                    <Input
                      id={inputId}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={draft[item.key]}
                      onChange={(event) =>
                        updateBudgetItem(item.key, event.target.value)
                      }
                      className="text-right tabular-nums"
                    />
                  ) : (
                    <div className="text-right text-sm font-semibold tabular-nums text-foreground">
                      {formatAmount(budget[item.key], currency)}
                    </div>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        {budgetError ? (
          <p className="text-sm text-red-600">{budgetError}</p>
        ) : null}

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
