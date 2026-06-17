import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { randomUUID } from "node:crypto";

import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import {
  AiOutputSchema,
  TravelPlanSchema,
  type TravelInput,
  type TravelPlan,
} from "@/types";

const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";

export class MissingAiApiKeyError extends Error {
  constructor() {
    super("OPENAI_API_KEY is not configured.");
    this.name = "MissingAiApiKeyError";
  }
}

export async function generateTravelPlan(
  input: TravelInput,
): Promise<TravelPlan> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new MissingAiApiKeyError();
  }

  const modelName = process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
  const openai = createOpenAI({ apiKey });

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
  });

  const now = new Date().toISOString();

  return TravelPlanSchema.parse({
    ...object,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    inputParams: input,
  });
}
