import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoadingState() {
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
        <CardDescription>
          正在整理行程、预算、行前清单和注意事项。
        </CardDescription>
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
