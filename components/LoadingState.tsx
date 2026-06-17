"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoadingState() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const waitingMessage =
    elapsedSeconds >= 45
      ? "如果等待过久，可以稍后重试"
      : elapsedSeconds >= 15
        ? "生成时间较长，请耐心等待"
        : "正在整理行程、预算、行前清单和注意事项。";

  return (
    <Card className="min-h-[22rem] justify-center">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-muted">
          <LoaderCircle
            className="h-6 w-6 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <CardTitle className="text-xl">正在生成旅行计划</CardTitle>
        <CardDescription>{waitingMessage}</CardDescription>
        <p className="text-sm text-muted-foreground">
          已等待 {elapsedSeconds} 秒
        </p>
      </CardHeader>

      <CardContent>
        <div className="mx-auto grid max-w-md gap-3" aria-hidden="true">
          <div className="h-3 rounded-md bg-muted" />
          <div className="h-3 rounded-md bg-muted" />
          <div className="h-3 w-3/4 rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
