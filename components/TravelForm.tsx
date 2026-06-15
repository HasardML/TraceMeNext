"use client";

import { useState } from "react";
import type { ZodIssue } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { TravelInputSchema, type TravelInput } from "@/types";

type TravelFormState = {
  destination: string;
  departureCity: string;
  days: string;
  budget: string;
  currency: string;
  travelers: string;
  travelType: string;
  preferences: string[];
  pace: string;
  specialRequests: string;
};

type FieldName = keyof TravelInput;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialFormState: TravelFormState = {
  destination: "",
  departureCity: "",
  days: "",
  budget: "",
  currency: "CNY",
  travelers: "",
  travelType: "",
  preferences: [],
  pace: "",
  specialRequests: "",
};

const currencyOptions = [
  { value: "CNY", label: "人民币 CNY" },
  { value: "USD", label: "美元 USD" },
  { value: "EUR", label: "欧元 EUR" },
  { value: "JPY", label: "日元 JPY" },
];

const travelTypeOptions = [
  { value: "solo", label: "一个人" },
  { value: "couple", label: "情侣" },
  { value: "family", label: "家庭" },
  { value: "friends", label: "朋友" },
];

const paceOptions = [
  { value: "relaxed", label: "轻松" },
  { value: "moderate", label: "适中" },
  { value: "intensive", label: "紧凑" },
];

const preferenceOptions = [
  { value: "food", label: "美食" },
  { value: "nature", label: "自然风光" },
  { value: "culture", label: "人文历史" },
  { value: "shopping", label: "购物" },
  { value: "family-friendly", label: "亲子友好" },
  { value: "local-life", label: "本地生活" },
];

const fieldNames: FieldName[] = [
  "destination",
  "departureCity",
  "days",
  "budget",
  "currency",
  "travelers",
  "travelType",
  "preferences",
  "pace",
  "specialRequests",
];

function optionalText(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function optionalNumber(value: string) {
  return value.trim().length > 0 ? Number(value) : undefined;
}

function isFieldName(value: PropertyKey): value is FieldName {
  return fieldNames.includes(value as FieldName);
}

function getFieldErrorMessage(field: FieldName, issue: ZodIssue) {
  const fallback = issue.message;

  switch (field) {
    case "destination":
      return "请输入目的地。";
    case "days":
      return "请输入 1 到 30 天之间的旅行天数。";
    case "budget":
      return "请输入不小于 0 的预算。";
    case "currency":
      return "请选择预算币种。";
    case "travelers":
      return "请输入 1 到 10 人之间的出行人数。";
    case "travelType":
      return "请选择有效的出行类型。";
    case "pace":
      return "请选择有效的行程节奏。";
    default:
      return fallback;
  }
}

function buildErrors(issues: ZodIssue[]) {
  const nextErrors: FieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (isFieldName(field) && !nextErrors[field]) {
      nextErrors[field] = getFieldErrorMessage(field, issue);
    }
  }

  return nextErrors;
}

export function TravelForm() {
  const [form, setForm] = useState<TravelFormState>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});

  function updateField(field: keyof TravelFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updatePreference(value: string, checked: boolean) {
    setForm((current) => {
      const preferences = checked
        ? [...current.preferences, value]
        : current.preferences.filter((preference) => preference !== value);

      return { ...current, preferences };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = TravelInputSchema.safeParse({
      destination: optionalText(form.destination),
      departureCity: optionalText(form.departureCity),
      days: optionalNumber(form.days),
      budget: optionalNumber(form.budget),
      currency: optionalText(form.currency),
      travelers: optionalNumber(form.travelers),
      travelType: optionalText(form.travelType),
      preferences:
        form.preferences.length > 0 ? form.preferences : undefined,
      pace: optionalText(form.pace),
      specialRequests: optionalText(form.specialRequests),
    });

    if (!parsed.success) {
      setErrors(buildErrors(parsed.error.issues));
      return;
    }

    setErrors({});
    console.log("Travel input", parsed.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-6 shadow-sm"
      noValidate
    >
      <div className="space-y-1.5">
        <h1 className="text-lg font-semibold text-card-foreground">
          旅行需求
        </h1>
        <p className="text-sm text-muted-foreground">
          填写基础偏好后提交，本阶段只校验输入。
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="destination">目的地</Label>
          <Input
            id="destination"
            name="destination"
            value={form.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            aria-invalid={Boolean(errors.destination)}
            placeholder="例如：东京"
            required
          />
          {errors.destination ? (
            <p className="text-sm text-red-600">{errors.destination}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureCity">出发城市</Label>
          <Input
            id="departureCity"
            name="departureCity"
            value={form.departureCity}
            onChange={(event) =>
              updateField("departureCity", event.target.value)
            }
            placeholder="例如：上海"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="days">天数</Label>
            <Input
              id="days"
              name="days"
              type="number"
              min={1}
              max={30}
              step={1}
              value={form.days}
              onChange={(event) => updateField("days", event.target.value)}
              aria-invalid={Boolean(errors.days)}
              required
            />
            {errors.days ? (
              <p className="text-sm text-red-600">{errors.days}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers">人数</Label>
            <Input
              id="travelers"
              name="travelers"
              type="number"
              min={1}
              max={10}
              step={1}
              value={form.travelers}
              onChange={(event) => updateField("travelers", event.target.value)}
              aria-invalid={Boolean(errors.travelers)}
              placeholder="可选"
            />
            {errors.travelers ? (
              <p className="text-sm text-red-600">{errors.travelers}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget">预算</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              min={0}
              step={100}
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              aria-invalid={Boolean(errors.budget)}
              required
            />
            {errors.budget ? (
              <p className="text-sm text-red-600">{errors.budget}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">币种</Label>
            <Select
              value={form.currency}
              onValueChange={(value) => updateField("currency", value)}
            >
              <SelectTrigger
                id="currency"
                className="w-full"
                aria-invalid={Boolean(errors.currency)}
              >
                <SelectValue placeholder="选择币种" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currency ? (
              <p className="text-sm text-red-600">{errors.currency}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>出行类型</Label>
            <Select
              value={form.travelType || undefined}
              onValueChange={(value) => updateField("travelType", value)}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={Boolean(errors.travelType)}
              >
                <SelectValue placeholder="可选" />
              </SelectTrigger>
              <SelectContent>
                {travelTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.travelType ? (
              <p className="text-sm text-red-600">{errors.travelType}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>行程节奏</Label>
            <Select
              value={form.pace || undefined}
              onValueChange={(value) => updateField("pace", value)}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={Boolean(errors.pace)}
              >
                <SelectValue placeholder="可选" />
              </SelectTrigger>
              <SelectContent>
                {paceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pace ? (
              <p className="text-sm text-red-600">{errors.pace}</p>
            ) : null}
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">
            偏好
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {preferenceOptions.map((option) => {
              const id = `preference-${option.value}`;
              const checked = form.preferences.includes(option.value);

              return (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(value) =>
                      updatePreference(option.value, value === true)
                    }
                  />
                  <Label htmlFor={id} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">特殊需求</Label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={form.specialRequests}
            onChange={(event) =>
              updateField("specialRequests", event.target.value)
            }
            placeholder="例如：不吃辣、需要少步行、希望安排亲子项目"
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full">
          提交需求
        </Button>
      </div>
    </form>
  );
}
