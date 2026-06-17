import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { generateTravelPlan, MissingAiApiKeyError } from "@/lib/ai";
import { TravelInputSchema } from "@/types";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "请求体必须是合法 JSON。" },
      { status: 400 },
    );
  }

  const inputResult = TravelInputSchema.safeParse(body);

  if (!inputResult.success) {
    return NextResponse.json(
      {
        error: "旅行需求参数不合法。",
        issues: inputResult.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const plan = await generateTravelPlan(inputResult.data);

    return NextResponse.json(plan);
  } catch (error) {
    if (error instanceof MissingAiApiKeyError) {
      return NextResponse.json(
        {
          error:
            "服务端尚未配置 OpenAI API Key。请在 .env.local 中添加 OPENAI_API_KEY 后重试。",
        },
        { status: 500 },
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "AI 返回的数据结构不符合 TravelPlan 格式，请稍后重试。" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { error: "生成旅行计划失败，请稍后重试。" },
      { status: 500 },
    );
  }
}
