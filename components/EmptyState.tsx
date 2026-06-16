import { MapPinned } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="min-h-[22rem] justify-center">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-muted">
          <MapPinned
            className="h-6 w-6 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <CardTitle className="text-xl">还没有旅行计划</CardTitle>
        <CardDescription>
          填写左侧需求并提交后，这里会展示完整的 Mock 旅行计划。
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
