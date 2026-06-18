import { TravelPlanSchema, type TravelItem, type TravelPlan } from "@/types";

const itemTypeLabels: Record<TravelItem["type"], string> = {
  attraction: "景点",
  food: "餐饮",
  transport: "交通",
  hotel: "住宿",
  shopping: "购物",
  rest: "休息",
};

const budgetRows: Array<[keyof TravelPlan["budget"], string]> = [
  ["transport", "交通"],
  ["accommodation", "住宿"],
  ["food", "餐饮"],
  ["tickets", "门票"],
  ["shopping", "购物"],
  ["other", "其他"],
  ["total", "合计"],
];

function cleanInlineText(value: string | number) {
  return String(value).replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
}

function formatTableCell(value: string | number) {
  const text = cleanInlineText(value);

  return text ? text.replace(/\|/g, "\\|") : "-";
}

function formatMoney(amount: number, currency: string) {
  return `${amount.toLocaleString("zh-CN")} ${currency}`;
}

function formatCost(cost: TravelItem["cost"], currency: string) {
  return typeof cost === "number" ? formatMoney(cost, currency) : "-";
}

export function exportToJSON(plan: TravelPlan): string {
  const parsedPlan = TravelPlanSchema.parse(plan);

  return JSON.stringify(parsedPlan, null, 2);
}

export function exportToMarkdown(plan: TravelPlan): string {
  const lines: string[] = [
    `# ${cleanInlineText(plan.title)}`,
    "",
    "## 概述",
    "",
    plan.summary,
    "",
    "## 基本信息",
    "",
    "| 项目 | 内容 |",
    "| --- | --- |",
    `| 目的地 | ${formatTableCell(plan.destination)} |`,
    `| 天数 | ${formatTableCell(`${plan.totalDays} 天`)} |`,
    `| 预算 | ${formatTableCell(formatMoney(plan.totalBudget, plan.currency))} |`,
    "",
    "## 每日行程",
    "",
  ];

  plan.days.forEach((day) => {
    lines.push(
      `### 第 ${day.day} 天：${cleanInlineText(day.theme)}`,
      "",
      "| 时间 | 地点 | 类型 | 描述 | 费用 |",
      "| --- | --- | --- | --- | --- |",
    );

    if (day.items.length === 0) {
      lines.push("| - | - | - | 暂无行程 | - |");
    } else {
      day.items.forEach((item) => {
        lines.push(
          [
            "|",
            formatTableCell(item.time),
            "|",
            formatTableCell(item.place),
            "|",
            formatTableCell(itemTypeLabels[item.type]),
            "|",
            formatTableCell(item.description),
            "|",
            formatTableCell(formatCost(item.cost, plan.currency)),
            "|",
          ].join(" "),
        );
      });
    }

    lines.push("");
  });

  lines.push(
    "## 预算明细",
    "",
    "| 项目 | 金额 |",
    "| --- | ---: |",
  );

  budgetRows.forEach(([key, label]) => {
    lines.push(
      `| ${formatTableCell(label)} | ${formatTableCell(
        formatMoney(plan.budget[key], plan.currency),
      )} |`,
    );
  });

  lines.push("", "## 行前清单", "");

  if (plan.packingList.length === 0) {
    lines.push("暂无行前清单。");
  } else {
    plan.packingList.forEach((item) => {
      lines.push(`- [${item.checked ? "x" : " "}] ${cleanInlineText(item.text)}`);
    });
  }

  lines.push("", "## 注意事项", "");

  if (plan.tips.length === 0) {
    lines.push("暂无注意事项。");
  } else {
    plan.tips.forEach((tip) => {
      lines.push(`- ${cleanInlineText(tip)}`);
    });
  }

  lines.push(
    "",
    "## AI 内容免责声明",
    "",
    "本旅行计划由 AI 辅助生成，可能存在不准确、过时或遗漏的信息。出行前请自行核实行程、交通、开放时间、签证、费用和安全要求，并以官方信息为准。",
  );

  return `${lines.join("\n").trimEnd()}\n`;
}
