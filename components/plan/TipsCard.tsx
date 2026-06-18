"use client";

import { useState } from "react";
import { Lightbulb, Plus, Trash2 } from "lucide-react";

import { EditableText } from "@/components/EditableText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type TipsCardProps = {
  tips: string[];
  onTipAdd?: (tip: string) => boolean | void;
  onTipSave?: (index: number, tip: string) => boolean | void;
  onTipDelete?: (index: number) => boolean | void;
};

export function TipsCard({
  tips,
  onTipAdd,
  onTipSave,
  onTipDelete,
}: TipsCardProps) {
  const [newTip, setNewTip] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  function addTip() {
    const tip = newTip.trim();

    if (!tip || !onTipAdd) {
      setAddError("请输入注意事项。");
      return;
    }

    const didAdd = onTipAdd(tip);

    if (didAdd === false) {
      return;
    }

    setNewTip("");
    setAddError(null);
  }

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
              key={`${tip}-${index}`}
              className="grid grid-cols-[2rem_1fr_auto] gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-semibold text-foreground">
                {index + 1}
              </span>
              <span className="flex min-w-0 items-start gap-2">
                <Lightbulb
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                {onTipSave ? (
                  <EditableText
                    value={tip}
                    onSave={(nextTip) => onTipSave(index, nextTip)}
                    as="textarea"
                    className="text-sm leading-6"
                    placeholder="注意事项"
                  />
                ) : (
                  <span>{tip}</span>
                )}
              </span>
              {onTipDelete ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onTipDelete(index)}
                  aria-label="删除注意事项"
                  title="删除注意事项"
                  className="-mr-2 text-destructive hover:text-destructive"
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              ) : null}
            </li>
          ))}
        </ol>

        {onTipAdd ? (
          <div className="mt-4 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={newTip}
                onChange={(event) => {
                  setNewTip(event.target.value);
                  setAddError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTip();
                  }
                }}
                placeholder="新增注意事项"
              />
              <Button type="button" onClick={addTip}>
                <Plus aria-hidden="true" />
                添加
              </Button>
            </div>
            {addError ? <p className="text-sm text-red-600">{addError}</p> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
