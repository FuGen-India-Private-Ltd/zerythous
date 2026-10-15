/**
 * Sanitizes input text by removing potentially dangerous HTML/script tags and null bytes.
 */
export function sanitizeInput(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/\0/g, "") // remove null bytes
    .replace(/<[^>]*>/g, "") // remove html tags
    .trim();
}

/**
 * In-memory rate limiter for form submissions (Rule 13 & 14)
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60_000
): { success: boolean; message?: string } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean expired entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (record.count >= limit) {
    return {
      success: false,
      message: "Too many requests. Please wait a minute before submitting again.",
    };
  }

  record.count += 1;
  return { success: true };
}
