"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background px-4 py-16">
      <div className="mx-auto flex max-w-md flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-card-foreground">
            页面暂时无法加载
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            请稍后重试，或返回后重新生成旅行计划。
          </p>
        </div>

        <Button type="button" onClick={reset}>
          重试
        </Button>
      </div>
    </main>
  );
}
