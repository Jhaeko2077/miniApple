const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const item = attempts.get(key);

  if (!item || item.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (item.count >= max) {
    return { allowed: false, retryAfter: Math.ceil((item.resetAt - now) / 1000) };
  }

  item.count += 1;
  return { allowed: true };
}
