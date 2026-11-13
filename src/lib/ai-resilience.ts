/**
 * AI Resilience, Multi-Model Fallback & Circuit Breaker Architecture
 * 
 * Protects generative AI workflows against:
 * - 503 / UNAVAILABLE capacity spikes
 * - 429 Rate limits
 * - 500 / 502 Server errors
 * - Network timeouts
 * 
 * Features:
 * - In-memory Circuit Breaker per model (trips on 3 consecutive 503/timeout failures, cooldown 60s)
 * - Exponential backoff with random jitter (base 400ms, max 2000ms)
 * - Strict per-call timeouts (15s non-streaming, 25s streaming setup)
 * - Structured telemetry logging (model, latency, error code, fallback attempts)
 * - Automatic multi-model fallback chain
 */

import { trackAiRequest, trackModelFallback } from "./monitoring";

export interface ModelAttemptLog {
  model: string;
  durationMs: number;
  success: boolean;
  errorCode?: string | number;
  errorMessage?: string;
}

interface CircuitState {
  failureCount: number;
  lastFailureTime: number;
  state: "CLOSED" | "OPEN" | "HALF_OPEN";
  trippedUntil: number;
}

const circuitStates = new Map<string, CircuitState>();

const CIRCUIT_FAILURE_THRESHOLD = 3;   // Trip after 3 consecutive failures
const CIRCUIT_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown when tripped
const DEFAULT_TIMEOUT_MS = 18 * 1000;   // 18 seconds timeout per attempt

/**
 * Resets all circuit breaker states (useful for testing and recovery)
 */
export function resetCircuitBreakers(): void {
  circuitStates.clear();
}

/**
 * Checks whether the circuit breaker for a given model is currently OPEN (blocking calls)
 */
export function isCircuitOpen(model: string): boolean {
  const state = circuitStates.get(model);
  if (!state) return false;

  const now = Date.now();
  if (state.state === "OPEN") {
    if (now >= state.trippedUntil) {
      // Cooldown elapsed, allow one test request (HALF_OPEN)
      state.state = "HALF_OPEN";
      return false;
    }
    return true; // Still tripped
  }

  return false;
}

/**
 * Records a successful model invocation to reset circuit state
 */
export function recordModelSuccess(model: string, durationMs: number) {
  const state = circuitStates.get(model);
  if (state) {
    state.failureCount = 0;
    state.state = "CLOSED";
  }
  console.log(`[AI Resilience] Model '${model}' succeeded in ${durationMs}ms`);
}

/**
 * Records a model failure and trips circuit if threshold exceeded
 */
export function recordModelFailure(model: string, error: any, durationMs: number) {
  const now = Date.now();
  let state = circuitStates.get(model);
  if (!state) {
    state = {
      failureCount: 0,
      lastFailureTime: now,
      state: "CLOSED",
      trippedUntil: 0,
    };
    circuitStates.set(model, state);
  }

  state.failureCount += 1;
  state.lastFailureTime = now;

  const is503 = isUnavailableError(error);
  console.warn(
    `[AI Resilience] Model '${model}' failed after ${durationMs}ms (Failure #${state.failureCount}, is503: ${is503}):`,
    error?.message || error
  );

  // If 3 consecutive failures (or 2 consecutive 503 capacity errors), trip the circuit
  if (state.failureCount >= CIRCUIT_FAILURE_THRESHOLD || (is503 && state.failureCount >= 2)) {
    state.state = "OPEN";
    state.trippedUntil = now + CIRCUIT_COOLDOWN_MS;
    console.error(
      `[AI Resilience] CIRCUIT BREAKER TRIPPED for model '${model}'. Bypassing model for ${CIRCUIT_COOLDOWN_MS / 1000}s.`
    );
  }
}

/**
 * Helper to identify retryable capacity or connection errors (503, 429, 502, 500, timeout)
 */
export function isRetryableAiError(error: any): boolean {
  if (!error) return false;
  const msg = String(error.message || error).toLowerCase();
  const status = error.status || error.code || error.statusCode;

  return (
    status === 503 ||
    status === "503" ||
    status === "UNAVAILABLE" ||
    status === 429 ||
    status === "429" ||
    status === "RESOURCE_EXHAUSTED" ||
    status === 502 ||
    status === 500 ||
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("no capacity") ||
    msg.includes("capacity") ||
    msg.includes("timeout") ||
    msg.includes("resource_exhausted") ||
    msg.includes("deadline exceeded")
  );
}

export function isUnavailableError(error: any): boolean {
  if (!error) return false;
  const msg = String(error.message || error).toLowerCase();
  const status = error.status || error.code || error.statusCode;
  return (
    status === 503 ||
    status === "503" ||
    status === "UNAVAILABLE" ||
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("no capacity")
  );
}

/**
 * Calculates exponential backoff with random jitter
 */
export async function waitWithJitter(attempt: number, baseMs = 350, maxMs = 1500): Promise<void> {
  const exponential = Math.min(maxMs, baseMs * Math.pow(1.8, attempt));
  const jitter = Math.random() * 250;
  const delay = Math.floor(exponential + jitter);
  await new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Executes a promise with a hard timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  operationName = "AI Request"
): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs / 1000}s`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

/**
 * Master execution runner that attempts a prioritized list of models with circuit breakers,
 * exponential backoff, and automatic fallback.
 */
export async function executeWithModelFallback<T>(
  models: string[],
  action: (modelName: string) => Promise<T>,
  options?: {
    taskName?: string;
    timeoutMs?: number;
    maxRetriesPerModel?: number;
  }
): Promise<{ result: T; modelUsed: string; attempts: ModelAttemptLog[] }> {
  const taskName = options?.taskName || "AI Task";
  const timeoutMs = options?.timeoutMs || DEFAULT_TIMEOUT_MS;
  const maxRetries = options?.maxRetriesPerModel ?? 1; // 1 retry before falling back to next model

  const attempts: ModelAttemptLog[] = [];

  for (let mIdx = 0; mIdx < models.length; mIdx++) {
    const model = models[mIdx];

    // Check circuit breaker
    if (isCircuitOpen(model)) {
      console.warn(
        `[AI Resilience] [${taskName}] Circuit is OPEN for model '${model}'. Skipping immediately to fallback.`
      );
      attempts.push({
        model,
        durationMs: 0,
        success: false,
        errorCode: "CIRCUIT_OPEN",
        errorMessage: "Circuit breaker open due to prior capacity errors",
      });
      continue;
    }

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        await waitWithJitter(attempt);
      }

      const start = Date.now();
      try {
        const result = await withTimeout(
          action(model),
          timeoutMs,
          `${taskName} (${model})`
        );
        const duration = Date.now() - start;

        recordModelSuccess(model, duration);
        trackAiRequest({
          model,
          success: true,
          durationMs: duration,
        });

        attempts.push({
          model,
          durationMs: duration,
          success: true,
        });

        if (mIdx > 0) {
          trackModelFallback(models[0], model, `Primary model unavailable; recovered via ${model}`);
          console.log(`[AI Resilience] [${taskName}] Successfully recovered using fallback model '${model}'.`);
        }

        return { result, modelUsed: model, attempts };
      } catch (err: any) {
        const duration = Date.now() - start;
        recordModelFailure(model, err, duration);
        trackAiRequest({
          model,
          success: false,
          durationMs: duration,
          errorCode: err?.status || err?.code || "FAIL",
        });

        attempts.push({
          model,
          durationMs: duration,
          success: false,
          errorCode: err?.status || err?.code || "FAIL",
          errorMessage: err?.message || String(err),
        });

        // If non-retryable error (e.g. invalid prompt structure), break retry loop and try next model
        if (!isRetryableAiError(err)) {
          break;
        }
      }
    }
  }

  // If all models failed, throw a clean, sanitized error
  const modelsTried = attempts.map((a) => a.model).join(" -> ");
  console.error(`[AI Resilience] [${taskName}] ALL models failed (${modelsTried}):`, attempts);

  throw new Error(
    "AI service is currently experiencing high demand. Please wait a moment and try again."
  );
}
