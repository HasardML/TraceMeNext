"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileQuestion, RefreshCw, Trash2 } from "lucide-react";

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
import { deletePlan, getPlan, updatePlan } from "@/lib/store";
import type { TravelPlan } from "@/types";

const REGENERATE_TIMEOUT_MS = 60_000;

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
            <DayList days={plan.days} currency={plan.currency} />
            <BudgetCard budget={plan.budget} currency={plan.currency} />
            <PackingList packingList={plan.packingList} />
            <TipsCard tips={plan.tips} />
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
