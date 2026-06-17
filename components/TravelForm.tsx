"use client";

import { useState, type FormEvent } from "react";
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

type TravelFormProps = {
  onSubmit?: (data: TravelInput) => void;
  loading?: boolean;
};

type TravelFormState = {
  destination: string;
  departureCity: string;
  startDate: string;
  days: string;
  travelers: string;
  specialRequests: string;
  budget: string;
  currency: string;
  travelType: string;
  preferences: string[];
  pace: string;
};

type FieldName = keyof TravelInput;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialFormState: TravelFormState = {
  destination: "",
  departureCity: "",
  startDate: "",
  days: "5",
  travelers: "1",
  specialRequests: "",
  budget: "",
  currency: "CNY",
  travelType: "",
  preferences: [],
  pace: "",
};

const currencyOptions = [
  { value: "CNY", label: "CNY" },
  { value: "USD", label: "USD" },
  { value: "JPY", label: "JPY" },
  { value: "EUR", label: "EUR" },
  { value: "THB", label: "THB" },
  { value: "KRW", label: "KRW" },
];

const travelTypeOptions = [
  { value: "solo", label: "独自旅行" },
  { value: "couple", label: "情侣" },
  { value: "family", label: "家庭" },
  { value: "friends", label: "朋友" },
];

const paceOptions = [
  { value: "relaxed", label: "轻松悠闲" },
  { value: "moderate", label: "适中" },
  { value: "intensive", label: "紧凑充实" },
];

const preferenceOptions = [
  "美食",
  "文化历史",
  "自然风光",
  "购物",
  "休闲放松",
  "动漫",
  "摄影",
  "亲子",
  "夜生活",
];

const fieldNames: FieldName[] = [
  "destination",
  "departureCity",
  "startDate",
  "days",
  "travelers",
  "specialRequests",
  "budget",
  "currency",
  "travelType",
  "preferences",
  "pace",
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
    case "travelers":
      return "请输入 1 到 10 人之间的出行人数。";
    case "budget":
      return "请输入不小于 0 的预算。";
    case "currency":
      return "请选择有效的货币。";
    case "travelType":
      return "请选择有效的出行类型。";
    case "pace":
      return "请选择有效的节奏偏好。";
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

export function TravelForm({ onSubmit, loading = false }: TravelFormProps = {}) {
  const [form, setForm] = useState<TravelFormState>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const parsed = TravelInputSchema.safeParse({
      destination: optionalText(form.destination),
      departureCity: optionalText(form.departureCity),
      startDate: optionalText(form.startDate),
      days: optionalNumber(form.days),
      travelers: optionalNumber(form.travelers),
      specialRequests: optionalText(form.specialRequests),
      budget: optionalNumber(form.budget),
      currency: optionalText(form.currency),
      travelType: optionalText(form.travelType),
      preferences: form.preferences.length > 0 ? form.preferences : undefined,
      pace: optionalText(form.pace),
    });

    if (!parsed.success) {
      setErrors(buildErrors(parsed.error.issues));
      setFormError("请检查表单中的提示后再生成旅行计划。");
      return;
    }

    setErrors({});
    setFormError(null);

    if (onSubmit) {
      onSubmit(parsed.data);
      return;
    }

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
          快速规划
        </h1>
        <p className="text-sm text-muted-foreground">
          先填写关键信息，预算和偏好可在高级选项中补充。
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
            aria-describedby={
              errors.destination ? "destination-error" : undefined
            }
            placeholder="例如：东京、巴黎、曼谷"
            required
          />
          {errors.destination ? (
            <p id="destination-error" className="text-sm text-red-600">
              {errors.destination}
            </p>
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
            placeholder="例如：上海、北京、广州"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="startDate">出发日期</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="days">旅行天数</Label>
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
              aria-describedby={errors.days ? "days-error" : undefined}
              required
            />
            {errors.days ? (
              <p id="days-error" className="text-sm text-red-600">
                {errors.days}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="travelers">出行人数</Label>
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
              aria-describedby={
                errors.travelers ? "travelers-error" : undefined
              }
            />
            {errors.travelers ? (
              <p id="travelers-error" className="text-sm text-red-600">
                {errors.travelers}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">一句话需求</Label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={form.specialRequests}
            onChange={(event) =>
              updateField("specialRequests", event.target.value)
            }
            placeholder="例如：想轻松一点，多吃当地美食，少排队，适合第一次去"
            rows={4}
          />
        </div>

        <div className="border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            aria-expanded={advancedOpen}
            aria-controls="advanced-travel-options"
            onClick={() => setAdvancedOpen((current) => !current)}
          >
            <span>{advancedOpen ? "收起高级选项" : "高级选项"}</span>
            <span aria-hidden="true">{advancedOpen ? "-" : "+"}</span>
          </Button>

          {advancedOpen ? (
            <div id="advanced-travel-options" className="mt-5 space-y-5">
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
                    onChange={(event) =>
                      updateField("budget", event.target.value)
                    }
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errors.budget ? "budget-error" : undefined}
                    placeholder="不填则按中等预算规划"
                  />
                  {errors.budget ? (
                    <p id="budget-error" className="text-sm text-red-600">
                      {errors.budget}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">货币</Label>
                  <Select
                    value={form.currency}
                    onValueChange={(value) => updateField("currency", value)}
                  >
                    <SelectTrigger
                      id="currency"
                      className="w-full"
                      aria-invalid={Boolean(errors.currency)}
                      aria-describedby={
                        errors.currency ? "currency-error" : undefined
                      }
                    >
                      <SelectValue placeholder="CNY" />
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
                    <p id="currency-error" className="text-sm text-red-600">
                      {errors.currency}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="travelType">出行类型</Label>
                  <Select
                    value={form.travelType || undefined}
                    onValueChange={(value) => updateField("travelType", value)}
                  >
                    <SelectTrigger
                      id="travelType"
                      className="w-full"
                      aria-invalid={Boolean(errors.travelType)}
                      aria-describedby={
                        errors.travelType ? "travelType-error" : undefined
                      }
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
                    <p id="travelType-error" className="text-sm text-red-600">
                      {errors.travelType}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pace">节奏偏好</Label>
                  <Select
                    value={form.pace || undefined}
                    onValueChange={(value) => updateField("pace", value)}
                  >
                    <SelectTrigger
                      id="pace"
                      className="w-full"
                      aria-invalid={Boolean(errors.pace)}
                      aria-describedby={errors.pace ? "pace-error" : undefined}
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
                    <p id="pace-error" className="text-sm text-red-600">
                      {errors.pace}
                    </p>
                  ) : null}
                </div>
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-foreground">
                  偏好标签
                </legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {preferenceOptions.map((option) => {
                    const id = `preference-${option}`;
                    const checked = form.preferences.includes(option);

                    return (
                      <div key={option} className="flex items-center gap-2">
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={(value) =>
                            updatePreference(option, value === true)
                          }
                        />
                        <Label htmlFor={id} className="font-normal">
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          ) : null}
        </div>

        {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

        <Button type="submit" className="w-full" disabled={loading}>
          生成旅行计划
        </Button>
      </div>
    </form>
  );
}
