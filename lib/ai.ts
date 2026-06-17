import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { randomUUID } from "node:crypto";

import {
  classifyError,
  TravelPlanError,
  TravelPlanErrorTypes,
  type TravelPlanErrorType,
} from "@/lib/errors";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import {
  AiOutputSchema,
  TravelPlanSchema,
  type TravelInput,
  type TravelPlan,
} from "@/types";

const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";
const DEFAULT_MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1000;
const AI_GENERATION_TIMEOUT_MS = 60_000;

type GenerateTravelPlanOptions = {
  maxRetries?: number;
};

const NON_RETRYABLE_ERROR_TYPES = new Set<TravelPlanErrorType>([
  TravelPlanErrorTypes.VALIDATION_ERROR,
  TravelPlanErrorTypes.API_KEY_ERROR,
]);

export async function generateTravelPlan(
  input: TravelInput,
  { maxRetries = DEFAULT_MAX_RETRIES }: GenerateTravelPlanOptions = {},
): Promise<TravelPlan> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new TravelPlanError({
      type: TravelPlanErrorTypes.API_KEY_ERROR,
      userMessage: "服务端尚未配置 AI API Key，请联系维护者处理。",
    });
  }

  const modelName = process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
  const openai = createOpenAI({ apiKey });
  const retryLimit = normalizeMaxRetries(maxRetries);
  let lastError: TravelPlanError | undefined;

  for (let attempt = 0; attempt <= retryLimit; attempt += 1) {
    try {
      const { object } = await generateObject({
        model: openai(modelName),
        schema: AiOutputSchema,
        schemaName: "TravelPlanAiOutput",
        schemaDescription:
          "Chinese travel plan content without server-managed metadata fields.",
        system: buildSystemPrompt(),
        prompt: buildUserPrompt(input),
        temperature: 0.7,
        maxOutputTokens: 6000,
        maxRetries: 0,
        timeout: AI_GENERATION_TIMEOUT_MS,
      });

      const now = new Date().toISOString();

      return TravelPlanSchema.parse({
        ...object,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
        inputParams: input,
      });
    } catch (error) {
      const classifiedError = classifyError(error);

      lastError = classifiedError;

      if (
        attempt >= retryLimit ||
        NON_RETRYABLE_ERROR_TYPES.has(classifiedError.type)
      ) {
        throw classifiedError;
      }

      await wait(RETRY_DELAY_MS);
    }
  }

  throw (
    lastError ??
    new TravelPlanError({
      type: TravelPlanErrorTypes.UNKNOWN_ERROR,
    })
  );
}

function normalizeMaxRetries(maxRetries: number): number {
  if (!Number.isFinite(maxRetries)) {
    return DEFAULT_MAX_RETRIES;
  }

  return Math.max(0, Math.floor(maxRetries));
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
