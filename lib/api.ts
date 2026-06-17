import type { TravelInput, TravelPlan } from "@/types";

type ErrorResponse = {
  message?: unknown;
};

function isErrorResponse(data: unknown): data is ErrorResponse {
  return data !== null && typeof data === "object" && "message" in data;
}

function getErrorMessage(data: unknown): string {
  if (
    isErrorResponse(data) &&
    typeof data.message === "string" &&
    data.message.length > 0
  ) {
    return data.message;
  }

  return "生成旅行计划失败，请稍后再试。";
}

export async function fetchTravelPlan(
  input: TravelInput,
  signal?: AbortSignal,
): Promise<TravelPlan> {
  const response = await fetch("/api/generate-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    signal,
  });

  if (!response.ok) {
    let data: unknown = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("生成旅行计划失败，请稍后再试。");
    }

    throw new Error(getErrorMessage(data));
  }

  return (await response.json()) as TravelPlan;
}
