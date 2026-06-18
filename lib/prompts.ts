import type { TravelInput } from "@/types";

// Prompt Schema Version: AiOutputSchema v2, aligned with TravelPlanSchema v2
// minus id, createdAt, updatedAt, and inputParams metadata fields.
export function buildSystemPrompt(): string {
  return [
    "你是一名专业旅行规划师。",
    "",
    "你的任务是根据用户需求生成一份个性化旅行计划。",
    "",
    "输出要求：",
    "- 只输出合法 JSON，不要输出 Markdown、代码块、解释、注释或多余文本。",
    "- JSON 必须与 AiOutputSchema v2 对齐。",
    "- 所有面向用户的内容必须使用中文。",
    "- 不要包含 id、createdAt、updatedAt、inputParams 字段。",
    "- 不要包含 coordinates、placeEn、weather、emergencyInfo 字段。",
    "- 每天 items 不超过 5 个主要行程项。",
    "- budget.total 必须等于 transport、accommodation、food、tickets、shopping、other 六项之和。",
    "- totalBudget 必须等于 budget.total。",
    "- packingList 至少 8 项，每项必须包含 text 和 checked。",
    "- packingList 每项的 checked 默认输出 false。",
    "- tips 至少 5 项。",
    "",
    "必须输出以下 JSON 结构：",
    JSON.stringify(
      {
        title: "string",
        summary: "string",
        destination: "string",
        totalDays: "number",
        totalBudget: "number",
        currency: "string",
        days: [
          {
            day: "number",
            theme: "string",
            items: [
              {
                time: "string",
                place: "string",
                type: "attraction | food | transport | hotel | shopping | rest",
                description: "string",
                cost: "number，可选",
              },
            ],
          },
        ],
        budget: {
          transport: "number",
          accommodation: "number",
          food: "number",
          tickets: "number",
          shopping: "number",
          other: "number",
          total: "number",
        },
        packingList: [
          {
            text: "string",
            checked: "boolean",
          },
        ],
        tips: ["string"],
      },
      null,
      2,
    ),
  ].join("\n");
}

export function buildUserPrompt(input: TravelInput): string {
  const request: Record<string, string | number | string[]> = {
    destination: input.destination,
    days: input.days,
    travelers: input.travelers,
    currency: input.currency,
    preferences: input.preferences,
  };

  addOptionalString(request, "departureCity", input.departureCity);
  addOptionalString(request, "startDate", input.startDate);
  addOptionalNumber(request, "budget", input.budget);
  addOptionalString(request, "travelType", input.travelType);
  addOptionalString(request, "pace", input.pace);
  addOptionalString(request, "specialRequests", input.specialRequests);

  return [
    "请根据以下用户旅行需求生成旅行计划。",
    "",
    "用户需求 JSON：",
    JSON.stringify(request, null, 2),
  ].join("\n");
}

function addOptionalString(
  target: Record<string, string | number | string[]>,
  key: string,
  value: string | undefined,
): void {
  const normalizedValue = value?.trim();

  if (normalizedValue) {
    target[key] = normalizedValue;
  }
}

function addOptionalNumber(
  target: Record<string, string | number | string[]>,
  key: string,
  value: number | undefined,
): void {
  if (value !== undefined) {
    target[key] = value;
  }
}
