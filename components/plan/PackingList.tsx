import { CheckCircle2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PackingListProps = {
  packingList: string[];
};

export function PackingList({ packingList }: PackingListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">行前清单</CardTitle>
        <CardDescription>出发前建议准备的物品与材料。</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {packingList.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground"
            >
              <CheckCircle2
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
