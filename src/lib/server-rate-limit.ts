/**
 * Server-Side Rate Limiter & Sliding Window Manager
 * 
 * Enforces strict rolling-window rate limits across browser tabs and devices:
 * 1. CV Upload Rate Limit: Max 3 documents per student (Firebase UID) per 20 minutes.
 * 2. Chatbot Message Rate Limit: Max 20 messages per student (Firebase UID) per 2 minutes.
 */

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory sliding window stores (retained across requests in the Node.js process)
const cvUploadStore = new Map<string, RateLimitEntry>();
const chatMessageStore = new Map<string, RateLimitEntry>();

// Cache of extracted CVs keyed by SHA-256 hash of file content or normalized text
interface CachedCvExtraction {
  extractedData: any;
  normalizedMarkdown: string;
  tokenMetrics?: any;
  cachedAt: number;
}
export const cvExtractionHashCache = new Map<string, CachedCvExtraction>();

/**
 * Generic sliding window rate limiter
 */
function checkSlidingWindow(
  store: Map<string, RateLimitEntry>,
  key: string,
  maxAllowed: number,
  windowMs: number
): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  resetTimeMs: number;
} {
  const now = Date.now();
  const entry = store.get(key) || { timestamps: [] };

  // Filter timestamps within the rolling window
  const activeTimestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= maxAllowed) {
    const oldest = activeTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    const resetTimeMs = oldest + windowMs;

    // Update store with cleaned timestamps
    store.set(key, { timestamps: activeTimestamps });

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
      resetTimeMs,
    };
  }

  // Record new access
  activeTimestamps.push(now);
  store.set(key, { timestamps: activeTimestamps });

  // Periodically clean up stale entries if store gets large
  if (store.size > 5000) {
    for (const [k, v] of store.entries()) {
      const valid = v.timestamps.filter((ts) => now - ts < windowMs);
      if (valid.length === 0) {
        store.delete(k);
      } else {
        store.set(k, { timestamps: valid });
      }
    }
  }

  const remaining = maxAllowed - activeTimestamps.length;
  const oldest = activeTimestamps[0];
  const resetTimeMs = oldest + windowMs;

  return {
    allowed: true,
    remaining,
    retryAfterSeconds: 0,
    resetTimeMs,
  };
}

/**
 * CV Upload Limit: 3 documents per student per 20 minutes (1,200,000 ms)
 */
export const CV_UPLOAD_LIMIT = 3;
export const CV_UPLOAD_WINDOW_MS = 20 * 60 * 1000; // 20 minutes

export function checkCvUploadRateLimit(firebaseUid: string) {
  return checkSlidingWindow(
    cvUploadStore,
    firebaseUid,
    CV_UPLOAD_LIMIT,
    CV_UPLOAD_WINDOW_MS
  );
}

/**
 * Chatbot Message Limit: 20 messages per student per 2 minutes (120,000 ms)
 */
export const CHAT_MESSAGE_LIMIT = 20;
export const CHAT_MESSAGE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

export function checkChatMessageRateLimit(firebaseUid: string) {
  return checkSlidingWindow(
    chatMessageStore,
    firebaseUid,
    CHAT_MESSAGE_LIMIT,
    CHAT_MESSAGE_WINDOW_MS
  );
}
