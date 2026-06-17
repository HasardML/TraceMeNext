"use client";

import { useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { TravelPlanView } from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { fetchTravelPlan } from "@/lib/api";
import type { TravelInput, TravelPlan } from "@/types";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: TravelInput) {
    setPlan(null);
    setError(null);
    setIsLoading(true);

    try {
      setPlan(await fetchTravelPlan(input));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "生成旅行计划失败，请稍后再试。",
      );
    } finally {
      setIsLoading(false);
    }
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
          {!isLoading && plan ? <TravelPlanView plan={plan} /> : null}
          {!isLoading && !plan && !error ? <EmptyState /> : null}
        </section>
      </div>
    </main>
  );
}
