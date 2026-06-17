"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Eye, RefreshCw, Save } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { TravelPlanView } from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { Button } from "@/components/ui/button";
import { fetchTravelPlan } from "@/lib/api";
import { getPlan, savePlan } from "@/lib/store";
import type { TravelInput, TravelPlan } from "@/types";

const GENERATE_TIMEOUT_MS = 60_000;

type PlanActionsProps = {
  plan: TravelPlan;
  canRegenerate: boolean;
  onRegenerate: () => Promise<void>;
};

function PlanActions({
  plan,
  canRegenerate,
  onRegenerate,
}: PlanActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const detailHref = `/plans/${encodeURIComponent(plan.id)}`;

  useEffect(() => {
    setIsSaved(getPlan(plan.id) !== null);
    setSaveFailed(false);
  }, [plan]);

  function handleSave() {
    try {
      savePlan(plan);
      const saved = getPlan(plan.id) !== null;

      setIsSaved(saved);
      setSaveFailed(!saved);
    } catch {
      setIsSaved(false);
      setSaveFailed(true);
    }
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        type="button"
        variant={isSaved ? "secondary" : "default"}
        onClick={handleSave}
        disabled={isSaved}
      >
        {isSaved ? <Check aria-hidden="true" /> : <Save aria-hidden="true" />}
        {isSaved ? "已保存" : saveFailed ? "保存失败" : "保存计划"}
      </Button>

      {isSaved ? (
        <Button asChild variant="outline">
          <Link href={detailHref}>
            <Eye aria-hidden="true" />
            查看详情
          </Link>
        </Button>
      ) : null}

      {canRegenerate ? (
        <Button type="button" onClick={onRegenerate}>
          <RefreshCw aria-hidden="true" />
          重新生成
        </Button>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmittedInput, setLastSubmittedInput] =
    useState<TravelInput | null>(null);

  async function generatePlan(input: TravelInput) {
    const controller = new AbortController();
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, GENERATE_TIMEOUT_MS);

    setPlan(null);
    setError(null);
    setIsLoading(true);
    setLastSubmittedInput(input);

    try {
      setPlan(await fetchTravelPlan(input, controller.signal));
    } catch (error) {
      if (didTimeout) {
        setError("生成超过 60 秒，已取消请求，请稍后重试。");
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "生成旅行计划失败，请稍后再试。",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }

  async function handleSubmit(input: TravelInput) {
    await generatePlan(input);
  }

  async function handleRegenerate() {
    if (!lastSubmittedInput) {
      return;
    }

    await generatePlan(lastSubmittedInput);
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section className="lg:sticky lg:top-6 lg:self-start">
          <TravelForm onSubmit={handleSubmit} loading={isLoading} />
        </section>

        <section className="space-y-6 lg:col-span-2">
          {isLoading ? <LoadingState /> : null}
          {!isLoading && error ? (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            >
              <p className="font-medium">生成失败</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}
          {!isLoading && plan ? (
            <>
              <PlanActions
                plan={plan}
                canRegenerate={lastSubmittedInput !== null}
                onRegenerate={handleRegenerate}
              />
              <TravelPlanView plan={plan} />
            </>
          ) : null}
          {!isLoading && !plan && !error ? <EmptyState /> : null}
        </section>
      </div>
    </main>
  );
}
