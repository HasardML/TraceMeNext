"use client";

import { useState } from "react";
import {
  Check,
  Coffee,
  Hotel,
  Landmark,
  Pencil,
  Plus,
  ShoppingBag,
  Train,
  Trash2,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";

import { EditableText } from "@/components/EditableText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { TravelDay, TravelItem } from "@/types";

type DayCardProps = {
  day: TravelDay;
  currency: string;
  onThemeSave?: (dayNumber: number, theme: string) => void;
  onItemSave?: (
    dayNumber: number,
    itemIndex: number,
    item: TravelItem,
  ) => boolean | void;
  onItemAdd?: (dayNumber: number, item: TravelItem) => boolean | void;
  onItemDelete?: (dayNumber: number, itemIndex: number) => boolean | void;
  onDayDelete?: (dayNumber: number) => boolean | void;
  canDeleteDay?: boolean;
};

type TravelItemDraft = Omit<TravelItem, "cost"> & {
  cost: string;
};

type ItemTypeConfig = {
  label: string;
  icon: LucideIcon;
  className: string;
};

const itemTypeConfig: Record<TravelItem["type"], ItemTypeConfig> = {
  attraction: {
    label: "景点",
    icon: Landmark,
    className: "border-sky-200 bg-sky-50 text-sky-700",
  },
  food: {
    label: "餐饮",
    icon: Utensils,
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  transport: {
    label: "交通",
    icon: Train,
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  hotel: {
    label: "住宿",
    icon: Hotel,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  shopping: {
    label: "购物",
    icon: ShoppingBag,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  rest: {
    label: "休息",
    icon: Coffee,
    className: "border-teal-200 bg-teal-50 text-teal-700",
  },
};

const costFormatter = new Intl.NumberFormat("zh-CN");
const itemTypeOptions = Object.entries(itemTypeConfig) as Array<
  [TravelItem["type"], ItemTypeConfig]
>;

const defaultTravelItem: TravelItem = {
  time: "09:00",
  place: "",
  type: "attraction",
  description: "",
};

function formatCost(cost: number, currency: string) {
  return `${currency} ${costFormatter.format(cost)}`;
}

function createItemDraft(item: TravelItem): TravelItemDraft {
  return {
    ...item,
    cost: item.cost === undefined ? "" : String(item.cost),
  };
}

function createItemFromDraft(draft: TravelItemDraft): TravelItem | null {
  const trimmedCost = draft.cost.trim();

  if (!trimmedCost) {
    return {
      time: draft.time,
      place: draft.place,
      type: draft.type,
      description: draft.description,
    };
  }

  const cost = Number(trimmedCost);

  if (!Number.isFinite(cost)) {
    return null;
  }

  return {
    ...draft,
    cost,
  };
}

export function DayCard({
  day,
  currency,
  onThemeSave,
  onItemSave,
  onItemAdd,
  onItemDelete,
  onDayDelete,
  canDeleteDay = false,
}: DayCardProps) {
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [itemDraft, setItemDraft] = useState<TravelItemDraft | null>(null);
  const [itemEditError, setItemEditError] = useState<string | null>(null);

  function startItemEditing(item: TravelItem, index: number) {
    setEditingItemIndex(index);
    setItemDraft(createItemDraft(item));
    setItemEditError(null);
  }

  function cancelItemEditing() {
    setEditingItemIndex(null);
    setItemDraft(null);
    setItemEditError(null);
  }

  function updateItemDraft(updates: Partial<TravelItemDraft>) {
    setItemDraft((currentDraft) =>
      currentDraft ? { ...currentDraft, ...updates } : currentDraft,
    );
  }

  function saveItemEditing(index: number) {
    if (!itemDraft || !onItemSave) {
      return;
    }

    const nextItem = createItemFromDraft(itemDraft);

    if (!nextItem) {
      setItemEditError("费用请输入数字。");
      return;
    }

    const didSave = onItemSave(day.day, index, nextItem);

    if (didSave === false) {
      return;
    }

    cancelItemEditing();
  }

  function addItem() {
    if (!onItemAdd) {
      return;
    }

    const nextItem = { ...defaultTravelItem };
    const didAdd = onItemAdd(day.day, nextItem);

    if (didAdd === false) {
      return;
    }

    setEditingItemIndex(day.items.length);
    setItemDraft(createItemDraft(nextItem));
    setItemEditError(null);
  }

  function deleteItem(index: number) {
    if (
      !onItemDelete ||
      !window.confirm(`确定删除第 ${day.day} 天的这条行程吗？`)
    ) {
      return;
    }

    const didDelete = onItemDelete(day.day, index);

    if (didDelete === false) {
      return;
    }

    cancelItemEditing();
  }

  function deleteDay() {
    if (!onDayDelete || !window.confirm(`确定删除第 ${day.day} 天吗？`)) {
      return;
    }

    onDayDelete(day.day);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <CardTitle className="flex flex-col gap-1 text-lg sm:flex-row sm:items-baseline sm:gap-3">
            <span>第 {day.day} 天</span>
            {onThemeSave ? (
              <EditableText
                value={day.theme}
                onSave={(theme) => onThemeSave(day.day, theme)}
                className="text-base font-medium text-muted-foreground"
                placeholder="每日主题"
              />
            ) : (
              <span className="text-base font-medium text-muted-foreground">
                {day.theme}
              </span>
            )}
          </CardTitle>

          {onDayDelete ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={deleteDay}
              disabled={!canDeleteDay}
              title={canDeleteDay ? "删除此天" : "至少需要保留 1 天"}
              className="self-start text-destructive hover:text-destructive"
            >
              <Trash2 aria-hidden="true" />
              <span className="sm:inline">删除此天</span>
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <ol className="space-y-4">
          {day.items.map((item, index) => {
            const config = itemTypeConfig[item.type];
            const Icon = config.icon;

            return (
              <li
                key={`${day.day}-${index}`}
                className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[4.5rem_1fr]"
              >
                {editingItemIndex === index && itemDraft ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor={`day-${day.day}-item-${index}-time`}>
                        时间
                      </Label>
                      <Input
                        id={`day-${day.day}-item-${index}-time`}
                        value={itemDraft.time}
                        onChange={(event) =>
                          updateItemDraft({ time: event.target.value })
                        }
                      />
                    </div>

                    <div className="min-w-0 space-y-4">
                      <div className="grid gap-3 sm:grid-cols-[1fr_10rem_10rem]">
                        <div className="space-y-2">
                          <Label htmlFor={`day-${day.day}-item-${index}-place`}>
                            地点
                          </Label>
                          <Input
                            id={`day-${day.day}-item-${index}-place`}
                            value={itemDraft.place}
                            onChange={(event) =>
                              updateItemDraft({ place: event.target.value })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>类型</Label>
                          <Select
                            value={itemDraft.type}
                            onValueChange={(type) =>
                              updateItemDraft({
                                type: type as TravelItem["type"],
                              })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {itemTypeOptions.map(
                                ([type, typeConfig]) => (
                                  <SelectItem key={type} value={type}>
                                    {typeConfig.label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`day-${day.day}-item-${index}-cost`}>
                            费用
                          </Label>
                          <Input
                            id={`day-${day.day}-item-${index}-cost`}
                            type="number"
                            inputMode="decimal"
                            value={itemDraft.cost}
                            onChange={(event) =>
                              updateItemDraft({ cost: event.target.value })
                            }
                            placeholder="可选"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`day-${day.day}-item-${index}-description`}
                        >
                          描述
                        </Label>
                        <Textarea
                          id={`day-${day.day}-item-${index}-description`}
                          value={itemDraft.description}
                          onChange={(event) =>
                            updateItemDraft({
                              description: event.target.value,
                            })
                          }
                        />
                      </div>

                      {itemEditError ? (
                        <p className="text-sm text-red-600">{itemEditError}</p>
                      ) : null}

                      <div className="flex flex-wrap justify-end gap-2">
                        {onItemDelete ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => deleteItem(index)}
                            className="mr-auto text-destructive hover:text-destructive"
                          >
                            <Trash2 aria-hidden="true" />
                            删除
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelItemEditing}
                        >
                          <X aria-hidden="true" />
                          取消
                        </Button>
                        <Button
                          type="button"
                          onClick={() => saveItemEditing(index)}
                        >
                          <Check aria-hidden="true" />
                          保存
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <time className="text-sm font-semibold tabular-nums text-foreground">
                      {item.time}
                    </time>

                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium",
                                config.className,
                              )}
                            >
                              <Icon
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              {config.label}
                            </span>
                            <h3 className="text-base font-semibold text-foreground">
                              {item.place || "未填写地点"}
                            </h3>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {item.cost !== undefined ? (
                            <span className="text-sm font-medium text-muted-foreground">
                              {formatCost(item.cost, currency)}
                            </span>
                          ) : null}

                          {onItemSave ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => startItemEditing(item, index)}
                              aria-label="编辑行程项"
                              title="编辑行程项"
                            >
                              <Pencil aria-hidden="true" />
                            </Button>
                          ) : null}

                          {onItemDelete ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => deleteItem(index)}
                              aria-label="删除行程项"
                              title="删除行程项"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 aria-hidden="true" />
                            </Button>
                          ) : null}
                        </div>
                      </div>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description || "暂无描述"}
                      </p>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {onItemAdd ? (
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={addItem}
          >
            <Plus aria-hidden="true" />
            添加行程
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
