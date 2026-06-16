"use client";

import { useEffect, useRef, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { TravelPlanView } from "@/components/plan";
import { TravelForm } from "@/components/TravelForm";
import { mockTravelPlan } from "@/lib/mock-data";
import type { TravelPlan } from "@/types";

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

  function handleSubmit() {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }

    setPlan(null);
    setIsLoading(true);

    const delay = 1000 + Math.random() * 1000;

    loadingTimerRef.current = setTimeout(() => {
      setPlan(mockTravelPlan);
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
