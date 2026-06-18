"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { ImportButton } from "@/components/ImportButton";
import { PlanCard } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePlan, getAllPlans } from "@/lib/store";
import type { TravelPlan } from "@/types";

export default function PlansPage() {
  const [plans, setPlans] = useState<TravelPlan[] | null>(null);

  useEffect(() => {
    setPlans(getAllPlans());
  }, []);

  const hasPlans = plans !== null && plans.length > 0;

  function handleDeletePlan(id: string) {
    deletePlan(id);
    setPlans(getAllPlans());
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-foreground">
              我的旅行计划
            </h1>
          </div>
          <ImportButton />
        </div>

        {hasPlans ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onDelete={handleDeletePlan} />
            ))}
          </div>
        ) : null}

        {plans !== null && !hasPlans ? (
          <Card className="min-h-[22rem] justify-center">
            <CardHeader className="items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                <FolderOpen
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-xl">暂无计划</CardTitle>
              <CardDescription>
                回到首页生成并保存旅行计划后，这里会展示你的计划列表。
              </CardDescription>
              <Button asChild className="mt-2">
                <Link href="/">回首页创建</Link>
              </Button>
            </CardHeader>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
