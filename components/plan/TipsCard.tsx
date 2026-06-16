import { Lightbulb } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TipsCardProps = {
  tips: string[];
};

export function TipsCard({ tips }: TipsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">注意事项</CardTitle>
        <CardDescription>旅行中值得提前留意的小提醒。</CardDescription>
      </CardHeader>

      <CardContent>
        <ol className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={tip}
              className="grid grid-cols-[2rem_1fr] gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-semibold text-foreground">
                {index + 1}
              </span>
              <span className="flex min-w-0 items-start gap-2">
                <Lightbulb
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
