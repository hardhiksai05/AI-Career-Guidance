/**
 * Production Monitoring & Structured Telemetry
 * 
 * Aggregates runtime platform metrics while strictly safeguarding student privacy:
 * - AI requests, latencies, 503s, fallbacks, token consumption
 * - Rate limit violations and upload rejections
 * - Database persistence health
 * 
 * PRIVACY INVARIANT:
 * - Never log raw CV documents, student names, emails, passwords, tokens, or API keys.
 */

interface AiMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  unavailable503Count: number;
  fallbackCount: number;
  totalTokensConsumed: number;
  averageLatencyMs: number;
  modelBreakdown: Record<string, { requests: number; failures: number; totalLatencyMs: number }>;
}

interface PlatformMetrics {
  ai: AiMetrics;
  rateLimitViolations: Record<string, number>;
  uploadRejections: Record<string, number>;
  dbPersistenceFailures: number;
  startedAt: string;
}

const metrics: PlatformMetrics = {
  ai: {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    unavailable503Count: 0,
    fallbackCount: 0,
    totalTokensConsumed: 0,
    averageLatencyMs: 0,
    modelBreakdown: {},
  },
  rateLimitViolations: {
    chat: 0,
    cv_upload: 0,
    chat_upload: 0,
    recommendations_regen: 0,
  },
  uploadRejections: {},
  dbPersistenceFailures: 0,
  startedAt: new Date().toISOString(),
};

let totalCumulativeLatency = 0;

/**
 * Tracks an AI inference request
 */
export function trackAiRequest(params: {
  model: string;
  success: boolean;
  durationMs: number;
  tokensConsumed?: number;
  errorCode?: string | number;
}) {
  const { model, success, durationMs, tokensConsumed = 0, errorCode } = params;

  metrics.ai.totalRequests += 1;
  totalCumulativeLatency += durationMs;
  metrics.ai.averageLatencyMs = Math.round(totalCumulativeLatency / metrics.ai.totalRequests);

  if (success) {
    metrics.ai.successfulRequests += 1;
    metrics.ai.totalTokensConsumed += tokensConsumed;
  } else {
    metrics.ai.failedRequests += 1;
    if (errorCode === 503 || errorCode === "503" || String(errorCode).includes("UNAVAILABLE")) {
      metrics.ai.unavailable503Count += 1;
    }
  }

  // Model breakdown
  if (!metrics.ai.modelBreakdown[model]) {
    metrics.ai.modelBreakdown[model] = { requests: 0, failures: 0, totalLatencyMs: 0 };
  }
  const mb = metrics.ai.modelBreakdown[model];
  mb.requests += 1;
  mb.totalLatencyMs += durationMs;
  if (!success) {
    mb.failures += 1;
  }

  console.log(
    `[Telemetry AI] Model: ${model} | Success: ${success} | Latency: ${durationMs}ms | Tokens: ${tokensConsumed} | Code: ${errorCode || "200"}`
  );
}

/**
 * Tracks a fallback event from one model to another
 */
export function trackModelFallback(fromModel: string, toModel: string, reason: string) {
  metrics.ai.fallbackCount += 1;
  console.warn(
    `[Telemetry Fallback] Switch from '${fromModel}' -> '${toModel}' (Reason: ${reason})`
  );
}

/**
 * Tracks rate limit triggers
 */
export function trackRateLimitViolation(type: "chat" | "cv_upload" | "chat_upload" | "recommendations_regen") {
  if (metrics.rateLimitViolations[type] !== undefined) {
    metrics.rateLimitViolations[type] += 1;
  } else {
    metrics.rateLimitViolations[type] = 1;
  }
  console.warn(`[Telemetry Security] Rate limit triggered: ${type}`);
}

/**
 * Tracks rejected file uploads
 */
export function trackUploadRejection(reason: string, extension?: string) {
  const key = extension ? `${reason}_(${extension})` : reason;
  metrics.uploadRejections[key] = (metrics.uploadRejections[key] || 0) + 1;
  console.warn(`[Telemetry Upload] Upload rejected: ${reason} [${extension || "unknown"}]`);
}

/**
 * Tracks database persistence failures
 */
export function trackDbPersistenceFailure(table: string, operation: string) {
  metrics.dbPersistenceFailures += 1;
  console.error(`[Telemetry DB] Persistence failure on table '${table}' during ${operation}`);
}

/**
 * Returns a sanitized diagnostic metrics summary
 */
export function getPlatformMetricsSummary(): PlatformMetrics {
  return JSON.parse(JSON.stringify(metrics));
}

