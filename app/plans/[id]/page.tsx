"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { TravelPlanView } from "@/components/plan";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPlan } from "@/lib/store";
import type { TravelPlan } from "@/types";

export default function PlanDetailPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(false);
    setPlan(getPlan(params.id));
    setHasLoaded(true);
  }, [params.id]);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/plans">
              <ArrowLeft aria-hidden="true" />
              返回我的计划
            </Link>
          </Button>
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

        {hasLoaded && plan ? <TravelPlanView plan={plan} /> : null}

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
