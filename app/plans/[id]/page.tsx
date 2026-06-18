"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  FileQuestion,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { Disclaimer } from "@/components/Disclaimer";
import {
  BudgetCard,
  DayList,
  PackingList,
  PlanOverview,
  TipsCard,
} from "@/components/plan";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchTravelPlan } from "@/lib/api";
import { downloadFile } from "@/lib/download";
import { exportToMarkdown } from "@/lib/export";
import { deletePlan, getPlan, updatePlan } from "@/lib/store";
import type { Budget, TravelDay, TravelItem, TravelPlan } from "@/types";

const REGENERATE_TIMEOUT_MS = 60_000;
const MARKDOWN_MIME_TYPE = "text/markdown;charset=utf-8";

function renumberDays(days: TravelDay[]) {
  return days.map((day, index) => ({
    ...day,
    day: index + 1,
  }));
}

function sanitizeFilenamePart(value: string) {
  return value
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createMarkdownFilename(plan: TravelPlan) {
  const destination = sanitizeFilenamePart(plan.destination) || "旅行计划";

  return `${destination}-${plan.totalDays}天旅行计划.md`;
}

export default function PlanDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    setHasLoaded(false);
    setPlan(getPlan(params.id));
    setActionError(null);
    setIsRegenerating(false);
    setHasLoaded(true);
  }, [params.id]);

  function handleDelete() {
    if (!plan || !window.confirm(`确定删除「${plan.title}」吗？`)) {
      return;
    }

    deletePlan(plan.id);
    router.push("/plans");
  }

  function handleExportMarkdown() {
    if (!plan) {
      return;
    }

    downloadFile(
      exportToMarkdown(plan),
      createMarkdownFilename(plan),
      MARKDOWN_MIME_TYPE,
    );
  }

  async function handleRegenerate() {
    if (!plan?.inputParams) {
      return;
    }

    const controller = new AbortController();
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, REGENERATE_TIMEOUT_MS);

    setActionError(null);
    setIsRegenerating(true);

    try {
      const regeneratedPlan = await fetchTravelPlan(
        plan.inputParams,
        controller.signal,
      );
      const savedPlan = updatePlan(plan.id, {
        ...regeneratedPlan,
        id: plan.id,
        createdAt: plan.createdAt,
        inputParams: plan.inputParams,
      });

      if (!savedPlan) {
        setActionError("重新生成成功，但保存到本地计划失败。");
        return;
      }

      setPlan(savedPlan);
    } catch (error) {
      if (didTimeout) {
        setActionError("生成超过 60 秒，已取消请求，请稍后重试。");
      } else {
        setActionError(
          error instanceof Error
            ? error.message
            : "重新生成旅行计划失败，请稍后再试。",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsRegenerating(false);
    }
  }

  function handlePlanTextSave(
    updates: Partial<Pick<TravelPlan, "title" | "summary">>,
  ) {
    if (!plan) {
      return;
    }

    setActionError(null);

    const savedPlan = updatePlan(plan.id, updates);

    if (!savedPlan) {
      setActionError("保存修改失败，请稍后再试。");
      return;
    }

    setPlan(savedPlan);
  }

  function persistPlanUpdates(updates: Partial<TravelPlan>) {
    if (!plan) {
      return null;
    }

    setActionError(null);

    const savedPlan = updatePlan(plan.id, updates);

    if (!savedPlan) {
      setActionError("保存修改失败，请稍后再试。");
      return null;
    }

    setPlan(savedPlan);
    return savedPlan;
  }

  function persistPlanDays(days: TravelPlan["days"]) {
    if (!plan) {
      return null;
    }

    return persistPlanUpdates({
      days,
      totalDays: days.length,
    });
  }

  function handleDayThemeSave(dayNumber: number, theme: string) {
    if (!plan) {
      return;
    }

    persistPlanDays(
      plan.days.map((day) =>
        day.day === dayNumber
          ? {
              ...day,
              theme,
            }
          : day,
      ),
    );
  }

  function handleDayItemSave(
    dayNumber: number,
    itemIndex: number,
    item: TravelItem,
  ) {
    if (!plan) {
      return false;
    }

    let didFindItem = false;
    const nextDays = plan.days.map((day) => {
      if (day.day !== dayNumber || !day.items[itemIndex]) {
        return day;
      }

      didFindItem = true;

      return {
        ...day,
        items: day.items.map((currentItem, currentIndex) =>
          currentIndex === itemIndex ? item : currentItem,
        ),
      };
    });

    if (!didFindItem) {
      setActionError("没有找到要编辑的行程项。");
      return false;
    }

    return Boolean(persistPlanDays(nextDays));
  }

  function handleDayItemAdd(dayNumber: number, item: TravelItem) {
    if (!plan) {
      return false;
    }

    let didFindDay = false;
    const nextDays = plan.days.map((day) => {
      if (day.day !== dayNumber) {
        return day;
      }

      didFindDay = true;

      return {
        ...day,
        items: [...day.items, item],
      };
    });

    if (!didFindDay) {
      setActionError("没有找到要添加行程的日期。");
      return false;
    }

    return Boolean(persistPlanDays(nextDays));
  }

  function handleDayItemDelete(dayNumber: number, itemIndex: number) {
    if (!plan) {
      return false;
    }

    let didFindItem = false;
    const nextDays = plan.days.map((day) => {
      if (day.day !== dayNumber || !day.items[itemIndex]) {
        return day;
      }

      didFindItem = true;

      return {
        ...day,
        items: day.items.filter((_, currentIndex) => currentIndex !== itemIndex),
      };
    });

    if (!didFindItem) {
      setActionError("没有找到要删除的行程项。");
      return false;
    }

    return Boolean(persistPlanDays(nextDays));
  }

  function handleDayAdd() {
    if (!plan) {
      return;
    }

    const nextDayNumber =
      Math.max(0, ...plan.days.map((currentDay) => currentDay.day)) + 1;
    const nextDay: TravelDay = {
      day: nextDayNumber,
      theme: "新的行程",
      items: [],
    };

    persistPlanDays([...plan.days, nextDay]);
  }

  function handleDayDelete(dayNumber: number) {
    if (!plan) {
      return false;
    }

    if (plan.days.length <= 1) {
      setActionError("至少需要保留 1 天。");
      return false;
    }

    const nextDays = renumberDays(
      plan.days.filter((day) => day.day !== dayNumber),
    );

    if (nextDays.length === plan.days.length) {
      setActionError("没有找到要删除的日期。");
      return false;
    }

    return Boolean(persistPlanDays(nextDays));
  }

  function handleBudgetChange(budget: Budget) {
    persistPlanUpdates({
      budget,
      totalBudget: budget.total,
    });
  }

  function handlePackingItemToggle(index: number, checked: boolean) {
    if (!plan?.packingList[index]) {
      setActionError("没有找到要更新的清单项。");
      return;
    }

    persistPlanUpdates({
      packingList: plan.packingList.map((item, currentIndex) =>
        currentIndex === index
          ? {
              ...item,
              checked,
            }
          : item,
      ),
    });
  }

  function handlePackingItemAdd(text: string) {
    if (!plan) {
      return false;
    }

    return Boolean(
      persistPlanUpdates({
        packingList: [
          ...plan.packingList,
          {
            text,
            checked: false,
          },
        ],
      }),
    );
  }

  function handlePackingItemDelete(index: number) {
    if (!plan?.packingList[index]) {
      setActionError("没有找到要删除的清单项。");
      return false;
    }

    return Boolean(
      persistPlanUpdates({
        packingList: plan.packingList.filter(
          (_, currentIndex) => currentIndex !== index,
        ),
      }),
    );
  }

  function handleTipAdd(tip: string) {
    if (!plan) {
      return false;
    }

    return Boolean(
      persistPlanUpdates({
        tips: [...plan.tips, tip],
      }),
    );
  }

  function handleTipSave(index: number, tip: string) {
    if (!plan || plan.tips[index] === undefined) {
      setActionError("没有找到要编辑的注意事项。");
      return false;
    }

    return Boolean(
      persistPlanUpdates({
        tips: plan.tips.map((currentTip, currentIndex) =>
          currentIndex === index ? tip : currentTip,
        ),
      }),
    );
  }

  function handleTipDelete(index: number) {
    if (!plan || plan.tips[index] === undefined) {
      setActionError("没有找到要删除的注意事项。");
      return false;
    }

    return Boolean(
      persistPlanUpdates({
        tips: plan.tips.filter((_, currentIndex) => currentIndex !== index),
      }),
    );
  }

  const canRegenerate = Boolean(plan?.inputParams);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/plans">
              <ArrowLeft aria-hidden="true" />
              返回我的计划
            </Link>
          </Button>

          {hasLoaded && plan ? (
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportMarkdown}
                >
                  <Download aria-hidden="true" />
                  导出 Markdown
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={!canRegenerate || isRegenerating}
                  title={
                    canRegenerate
                      ? undefined
                      : "缺少原始输入参数，无法重新生成。"
                  }
                >
                  <RefreshCw
                    className={isRegenerating ? "animate-spin" : undefined}
                    aria-hidden="true"
                  />
                  {isRegenerating ? "重新生成中" : "重新生成"}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isRegenerating}
                >
                  <Trash2 aria-hidden="true" />
                  删除
                </Button>
              </div>

              {!canRegenerate ? (
                <p className="max-w-72 text-right text-sm text-muted-foreground">
                  这个计划缺少原始输入参数，无法重新生成。
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {!hasLoaded ? (
          <Card className="min-h-[14rem] justify-center">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl">正在读取计划</CardTitle>
              <CardDescription>
                正在从浏览器本地存储读取旅行计划。
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        {hasLoaded && plan ? (
          <div className="space-y-4">
            {actionError ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {actionError}
              </div>
            ) : null}
            <PlanOverview
              plan={plan}
              onTitleSave={(title) => handlePlanTextSave({ title })}
              onSummarySave={(summary) => handlePlanTextSave({ summary })}
            />
            <DayList
              days={plan.days}
              currency={plan.currency}
              onThemeSave={handleDayThemeSave}
              onItemSave={handleDayItemSave}
              onItemAdd={handleDayItemAdd}
              onItemDelete={handleDayItemDelete}
              onDayAdd={handleDayAdd}
              onDayDelete={handleDayDelete}
            />
            <BudgetCard
              budget={plan.budget}
              currency={plan.currency}
              onBudgetChange={handleBudgetChange}
            />
            <PackingList
              packingList={plan.packingList}
              onItemToggle={handlePackingItemToggle}
              onItemAdd={handlePackingItemAdd}
              onItemDelete={handlePackingItemDelete}
            />
            <TipsCard
              tips={plan.tips}
              onTipAdd={handleTipAdd}
              onTipSave={handleTipSave}
              onTipDelete={handleTipDelete}
            />
            <Disclaimer />
          </div>
        ) : null}

        {hasLoaded && !plan ? (
          <Card className="min-h-[22rem] justify-center">
            <CardHeader className="items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                <FileQuestion
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-xl">没有找到这个计划</CardTitle>
              <CardDescription>
                它可能尚未保存，或浏览器本地数据已被清空。
              </CardDescription>
              <Button asChild className="mt-2">
                <Link href="/plans">返回我的计划</Link>
              </Button>
            </CardHeader>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
