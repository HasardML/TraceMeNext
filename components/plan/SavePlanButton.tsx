"use client";

import { useEffect, useState } from "react";
import { Check, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPlan, savePlan } from "@/lib/store";
import type { TravelPlan } from "@/types";

type SavePlanButtonProps = {
  plan: TravelPlan;
};

export function SavePlanButton({ plan }: SavePlanButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    setIsSaved(getPlan(plan.id) !== null);
    setSaveFailed(false);
  }, [plan]);

  function handleSave() {
    try {
      savePlan(plan);
      const saved = getPlan(plan.id) !== null;

      setIsSaved(saved);
      setSaveFailed(!saved);
    } catch {
      setIsSaved(false);
      setSaveFailed(true);
    }
  }

  return (
    <Button
      type="button"
      variant={isSaved ? "secondary" : "default"}
      onClick={handleSave}
      disabled={isSaved}
    >
      {isSaved ? (
        <Check aria-hidden="true" />
      ) : (
        <Save aria-hidden="true" />
      )}
      {isSaved ? "已保存" : saveFailed ? "保存失败" : "保存计划"}
    </Button>
  );
}
