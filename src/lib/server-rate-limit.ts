/**
 * Server-Side Rate Limiter & Sliding Window Manager
 * 
 * Enforces strict rolling-window rate limits across browser tabs and devices:
 * 1. CV Upload Rate Limit: Max 3 documents per student (Firebase UID) per 20 minutes.
 * 2. Chatbot Message Rate Limit: Max 20 messages per student (Firebase UID) per 2 minutes.
 * 3. Chat File Upload Rate Limit: Max 5 uploads per student (Firebase UID) per 10 minutes.
 * 4. Recommendation Regeneration Limit: Max 3 requests per student (Firebase UID) per 30 minutes.
 */

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory sliding window stores (retained across requests in the Node.js process)
const cvUploadStore = new Map<string, RateLimitEntry>();
const chatMessageStore = new Map<string, RateLimitEntry>();
const chatUploadStore = new Map<string, RateLimitEntry>();
const recommendationRegenStore = new Map<string, RateLimitEntry>();

// Cache of extracted CVs keyed by `${firebaseUid}:${contentHash}`
export interface CachedCvExtraction {
  extractedData: any;
  normalizedMarkdown: string;
  tokenMetrics?: any;
  cachedAt: number;
}

const MAX_CACHE_ENTRIES = 500;
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours strict TTL

export class BoundedTtlCache<T extends { cachedAt: number }> {
  private store = new Map<string, T>();
  private maxCapacity: number;
  private ttlMs: number;

  constructor(maxCapacity: number, ttlMs: number) {
    this.maxCapacity = maxCapacity;
    this.ttlMs = ttlMs;
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    // Check expiration
    if (Date.now() - entry.cachedAt > this.ttlMs) {
      this.store.delete(key);
      return null;
    }

    // Refresh position for LRU
    this.store.delete(key);
    this.store.set(key, entry);
    return entry;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  set(key: string, value: T): void {
    // If key exists, delete first to refresh position
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxCapacity) {
      // Evict oldest entry (first key in insertion order)
      const oldestKey = this.store.keys().next().value;
      if (oldestKey) {
        this.store.delete(oldestKey);
      }
    }
    this.store.set(key, value);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}

// Bounded in-memory extraction cache with max 500 entries and 2-hour TTL
export const cvExtractionHashCache = new BoundedTtlCache<CachedCvExtraction>(
  MAX_CACHE_ENTRIES,
  CACHE_TTL_MS
);

/**
 * Generates a collision-resistant user-namespaced cache key
 */
export function getCvCacheKey(firebaseUid: string, contentHash: string): string {
  return `${firebaseUid.trim()}:${contentHash.trim()}`;
}

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
  if (store.size > 2000) {
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
export const CV_UPLOAD_WINDOW_MS = 20 * 60 * 1000;

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
export const CHAT_MESSAGE_WINDOW_MS = 2 * 60 * 1000;

export function checkChatMessageRateLimit(firebaseUid: string) {
  return checkSlidingWindow(
    chatMessageStore,
    firebaseUid,
    CHAT_MESSAGE_LIMIT,
    CHAT_MESSAGE_WINDOW_MS
  );
}

/**
 * Chat Document Upload Limit: 5 uploads per student per 10 minutes (600,000 ms)
 */
export const CHAT_UPLOAD_LIMIT = 5;
export const CHAT_UPLOAD_WINDOW_MS = 10 * 60 * 1000;

export function checkChatUploadRateLimit(firebaseUid: string) {
  return checkSlidingWindow(
    chatUploadStore,
    firebaseUid,
    CHAT_UPLOAD_LIMIT,
    CHAT_UPLOAD_WINDOW_MS
  );
}

/**
 * Career Recommendation Regeneration Limit: 3 regenerations per student per 30 minutes (1,800,000 ms)
 */
export const RECOMMENDATION_REGEN_LIMIT = 3;
export const RECOMMENDATION_REGEN_WINDOW_MS = 30 * 60 * 1000;

export function checkRecommendationRegenRateLimit(firebaseUid: string) {
  return checkSlidingWindow(
    recommendationRegenStore,
    firebaseUid,
    RECOMMENDATION_REGEN_LIMIT,
    RECOMMENDATION_REGEN_WINDOW_MS
  );
}

