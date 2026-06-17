import {
  APICallError,
  InvalidResponseDataError,
  JSONParseError,
  LoadAPIKeyError,
  NoObjectGeneratedError,
  RetryError,
  TypeValidationError,
} from "ai";
import { ZodError } from "zod";

export const TravelPlanErrorTypes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AI_GENERATION_ERROR: "AI_GENERATION_ERROR",
  AI_PARSE_ERROR: "AI_PARSE_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  API_KEY_ERROR: "API_KEY_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type TravelPlanErrorType =
  (typeof TravelPlanErrorTypes)[keyof typeof TravelPlanErrorTypes];

const DEFAULT_USER_MESSAGES: Record<TravelPlanErrorType, string> = {
  [TravelPlanErrorTypes.VALIDATION_ERROR]:
    "旅行需求参数不合法，请检查后重试。",
  [TravelPlanErrorTypes.AI_GENERATION_ERROR]:
    "生成旅行计划失败，请稍后重试。",
  [TravelPlanErrorTypes.AI_PARSE_ERROR]:
    "AI 返回的数据结构不符合预期，请稍后重试。",
  [TravelPlanErrorTypes.NETWORK_ERROR]:
    "连接 AI 服务失败，请稍后重试。",
  [TravelPlanErrorTypes.API_KEY_ERROR]:
    "服务端 AI 配置不可用，请联系维护者处理。",
  [TravelPlanErrorTypes.RATE_LIMIT_ERROR]:
    "AI 服务请求过于频繁，请稍后再试。",
  [TravelPlanErrorTypes.TIMEOUT_ERROR]:
    "生成旅行计划超时，请稍后重试或减少旅行天数。",
  [TravelPlanErrorTypes.UNKNOWN_ERROR]:
    "生成旅行计划时发生未知错误，请稍后重试。",
};

type TravelPlanErrorOptions = {
  type: TravelPlanErrorType;
  userMessage?: string;
  originalError?: unknown;
};

export class TravelPlanError extends Error {
  readonly type: TravelPlanErrorType;
  readonly userMessage: string;
  readonly originalError?: unknown;

  constructor({ type, userMessage, originalError }: TravelPlanErrorOptions) {
    const resolvedUserMessage = userMessage ?? DEFAULT_USER_MESSAGES[type];

    super(resolvedUserMessage);

    this.name = "TravelPlanError";
    this.type = type;
    this.userMessage = resolvedUserMessage;
    this.originalError = originalError;
  }
}

export function classifyError(error: unknown): TravelPlanError {
  if (error instanceof TravelPlanError) {
    return error;
  }

  if (RetryError.isInstance(error)) {
    const retryCause = error.lastError ?? error.errors[error.errors.length - 1];

    if (retryCause !== undefined) {
      const classifiedCause = classifyError(retryCause);

      return new TravelPlanError({
        type: classifiedCause.type,
        userMessage: classifiedCause.userMessage,
        originalError: error,
      });
    }
  }

  const statusCode = getStatusCode(error);

  if (isTimeoutError(error) || statusCode === 408 || statusCode === 504) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.TIMEOUT_ERROR,
      originalError: error,
    });
  }

  if (statusCode === 429 || isRateLimitError(error)) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.RATE_LIMIT_ERROR,
      originalError: error,
    });
  }

  if (isApiKeyError(error) || statusCode === 401 || statusCode === 403) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.API_KEY_ERROR,
      originalError: error,
    });
  }

  if (isAiParseError(error)) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.AI_PARSE_ERROR,
      originalError: error,
    });
  }

  if (
    isNetworkError(error) ||
    (APICallError.isInstance(error) && statusCode === undefined)
  ) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.NETWORK_ERROR,
      originalError: error,
    });
  }

  if (APICallError.isInstance(error) || statusCode !== undefined) {
    return new TravelPlanError({
      type: TravelPlanErrorTypes.AI_GENERATION_ERROR,
      originalError: error,
    });
  }

  return new TravelPlanError({
    type: TravelPlanErrorTypes.UNKNOWN_ERROR,
    originalError: error,
  });
}

function isAiParseError(error: unknown): boolean {
  return (
    error instanceof ZodError ||
    TypeValidationError.isInstance(error) ||
    JSONParseError.isInstance(error) ||
    InvalidResponseDataError.isInstance(error) ||
    NoObjectGeneratedError.isInstance(error)
  );
}

function isApiKeyError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();

  return (
    LoadAPIKeyError.isInstance(error) ||
    message.includes("api key") ||
    message.includes("apikey") ||
    message.includes("unauthorized") ||
    message.includes("invalid credentials")
  );
}

function isRateLimitError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();

  return message.includes("rate limit") || message.includes("too many requests");
}

function isTimeoutError(error: unknown): boolean {
  const name = getErrorName(error);
  const message = getErrorMessage(error).toLowerCase();

  return (
    name === "AbortError" ||
    name === "TimeoutError" ||
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("etimedout")
  );
}

function isNetworkError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();

  return (
    (error instanceof TypeError &&
      (message.includes("fetch") || message.includes("network"))) ||
    message.includes("failed to fetch") ||
    message.includes("fetch failed") ||
    message.includes("econnaborted") ||
    message.includes("econnrefused") ||
    message.includes("econnreset") ||
    message.includes("enotfound") ||
    message.includes("enetunreach")
  );
}

function getStatusCode(error: unknown): number | undefined {
  if (APICallError.isInstance(error)) {
    return error.statusCode;
  }

  if (!isRecord(error)) {
    return undefined;
  }

  const statusCode = error.statusCode ?? error.status;

  return typeof statusCode === "number" ? statusCode : undefined;
}

function getErrorName(error: unknown): string {
  if (error instanceof Error) {
    return error.name;
  }

  if (isRecord(error) && typeof error.name === "string") {
    return error.name;
  }

  return "";
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
