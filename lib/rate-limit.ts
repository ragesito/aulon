/**
 * In-memory sliding-window rate limiter.
 * Keyed by IP (x-forwarded-for on Vercel). Good enough for v1 on a single
 * serverless instance; swap for Upstash/Redis if traffic grows.
 */

type Window = number[]; // timestamps (ms) of recent hits

const buckets = new Map<string, Window>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5; // 5 req/min per IP per action

// Prevent unbounded memory growth
const MAX_BUCKETS = 10_000;

export function rateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  let hits = buckets.get(key)?.filter((t) => t > windowStart) ?? [];

  if (hits.length >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((hits[0] + WINDOW_MS - now) / 1000);
    buckets.set(key, hits);
    return { ok: false, retryAfterSec };
  }

  hits.push(now);

  if (buckets.size >= MAX_BUCKETS && !buckets.has(key)) {
    // Evict oldest bucket wholesale under pressure
    const first = buckets.keys().next().value;
    if (first !== undefined) buckets.delete(first);
  }
  buckets.set(key, hits);
  return { ok: true, retryAfterSec: 0 };
}

/** Extract client IP — Vercel sets x-forwarded-for; first entry is the client. */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
