/**
 * Rate Limiting Utilities
 *
 * Simple in-memory rate limiting with optional Redis/KV support
 */

interface RateLimitConfig {
  uniqueId: string; // IP address or user ID
  limit: number; // Max requests
  window: number; // Time window in seconds
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // Unix timestamp when limit resets
}

// In-memory storage for rate limits (fallback when Redis is not available)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Check rate limit for a given identifier
 *
 * Uses in-memory storage by default. Can be extended to use Redis/Vercel KV.
 *
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and remaining count
 */
export async function checkRateLimit(
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const {uniqueId, limit, window} = config;
  const key = `ratelimit:${uniqueId}`;
  const now = Date.now();
  const resetAt = now + window * 1000;

  // Check if we have Redis/KV available (optional future enhancement)
  // For now, use in-memory storage
  const stored = rateLimitStore.get(key);

  if (!stored || now > stored.resetAt) {
    // First request or window expired - reset
    rateLimitStore.set(key, {count: 1, resetAt});
    return {
      success: true,
      remaining: limit - 1,
      reset: resetAt
    };
  }

  if (stored.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: stored.resetAt
    };
  }

  // Increment count
  stored.count += 1;
  rateLimitStore.set(key, stored);

  return {
    success: true,
    remaining: limit - stored.count,
    reset: stored.resetAt
  };
}

/**
 * Get client IP address from request headers
 *
 * @param headers - Request headers
 * @returns IP address or 'unknown'
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const cfConnectingIp = headers.get('cf-connecting-ip');

  if (forwardedFor) {
    // x-forwarded-for may contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return 'unknown';
}

/**
 * Clean up expired rate limit entries (optional maintenance)
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000);
}
