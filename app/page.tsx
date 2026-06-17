"use client";

import { useEffect, useRef, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { TravelPlanView } from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { mockTravelPlan } from "@/lib/mock-data";
import type { TravelInput, TravelPlan } from "@/types";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  function handleSubmit(input: TravelInput) {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }

    setPlan(null);
    setIsLoading(true);

    const delay = 1000 + Math.random() * 1000;

    loadingTimerRef.current = setTimeout(() => {
      setPlan({
        ...mockTravelPlan,
        title: `${input.destination} ${input.days} 天游玩计划`,
        summary: `基于你填写的 ${input.destination} 行程需求生成的 Mock 预览。后续 API 阶段会替换为实时规划结果。`,
        destination: input.destination,
        totalDays: input.days,
        totalBudget: input.budget ?? mockTravelPlan.totalBudget,
        currency: input.currency,
        inputParams: input,
        updatedAt: new Date().toISOString(),
      });
      setIsLoading(false);
      loadingTimerRef.current = null;
    }, delay);
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section className="lg:sticky lg:top-6 lg:self-start">
          <TravelForm onSubmit={handleSubmit} loading={isLoading} />
        </section>

        <section className="space-y-6 lg:col-span-2">
          {isLoading ? <LoadingState /> : null}
          {!isLoading && plan ? <TravelPlanView plan={plan} /> : null}
          {!isLoading && !plan ? <EmptyState /> : null}
        </section>
      </div>
    </main>
  );
}
