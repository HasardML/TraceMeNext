"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { PackingItem } from "@/types";

type PackingListProps = {
  packingList: PackingItem[];
  onItemToggle?: (index: number, checked: boolean) => void;
  onItemAdd?: (text: string) => boolean | void;
  onItemDelete?: (index: number) => boolean | void;
};

export function PackingList({
  packingList,
  onItemToggle,
  onItemAdd,
  onItemDelete,
}: PackingListProps) {
  const [newItemText, setNewItemText] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  function addItem() {
    const text = newItemText.trim();

    if (!text || !onItemAdd) {
      setAddError("请输入清单内容。");
      return;
    }

    const didAdd = onItemAdd(text);

    if (didAdd === false) {
      return;
    }

    setNewItemText("");
    setAddError(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">行前清单</CardTitle>
        <CardDescription>出发前建议准备的物品与材料。</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {packingList.map((item, index) => (
            <li
              key={`${item.text}-${index}`}
              className="flex items-start gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground"
            >
              <Checkbox
                checked={item.checked}
                onCheckedChange={(checked) =>
                  onItemToggle?.(index, checked === true)
                }
                className="mt-1"
                aria-label={`标记${item.text}`}
              />
              <span
                className={
                  item.checked
                    ? "min-w-0 flex-1 text-muted-foreground line-through"
                    : "min-w-0 flex-1"
                }
              >
                {item.text}
              </span>
              {onItemDelete ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onItemDelete(index)}
                  aria-label="删除清单项"
                  title="删除清单项"
                  className="-mr-2 -mt-1 text-destructive hover:text-destructive"
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              ) : null}
            </li>
          ))}
        </ul>

        {onItemAdd ? (
          <div className="mt-4 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={newItemText}
                onChange={(event) => {
                  setNewItemText(event.target.value);
                  setAddError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addItem();
                  }
                }}
                placeholder="新增清单项"
              />
              <Button type="button" onClick={addItem}>
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
