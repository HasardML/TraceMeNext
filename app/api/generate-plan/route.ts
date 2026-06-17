import { NextResponse } from "next/server";

import { generateTravelPlan } from "@/lib/ai";
import {
  classifyError,
  TravelPlanError,
  TravelPlanErrorTypes,
  type TravelPlanErrorType,
} from "@/lib/errors";
import { TravelInputSchema } from "@/types";

const ERROR_STATUS: Record<TravelPlanErrorType, number> = {
  [TravelPlanErrorTypes.VALIDATION_ERROR]: 400,
  [TravelPlanErrorTypes.AI_GENERATION_ERROR]: 500,
  [TravelPlanErrorTypes.AI_PARSE_ERROR]: 500,
  [TravelPlanErrorTypes.NETWORK_ERROR]: 500,
  [TravelPlanErrorTypes.API_KEY_ERROR]: 500,
  [TravelPlanErrorTypes.RATE_LIMIT_ERROR]: 429,
  [TravelPlanErrorTypes.TIMEOUT_ERROR]: 504,
  [TravelPlanErrorTypes.UNKNOWN_ERROR]: 500,
};

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      throw new TravelPlanError({
        type: TravelPlanErrorTypes.VALIDATION_ERROR,
        userMessage: "请求体必须是合法 JSON。",
        originalError: error,
      });
    }

    const inputResult = TravelInputSchema.safeParse(body);

    if (!inputResult.success) {
      throw new TravelPlanError({
        type: TravelPlanErrorTypes.VALIDATION_ERROR,
        userMessage: "旅行需求参数不合法。",
        originalError: inputResult.error,
      });
    }

    return NextResponse.json(await generateTravelPlan(inputResult.data));
  } catch (error) {
    return buildErrorResponse(
      error instanceof TravelPlanError ? error : classifyError(error),
    );
  }
}

function buildErrorResponse(error: TravelPlanError) {
  return NextResponse.json(
    {
      error: error.type,
      message: error.userMessage,
    },
    { status: ERROR_STATUS[error.type] },
  );
}
