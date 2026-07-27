// middleware/rateLimiter.js
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
redis.connect();

/**
 * @param {number} limit - max requests allowed
 * @param {number} windowSec - time window in seconds
 */
export const rateLimiter = (limit = 100, windowSec = 60) => {
  return async (req, res, next) => {
    const key = `rl:${req.ip}:${req.path}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowSec); // set TTL only on first request
    }

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - current));

    if (current > limit) {
      const ttl = await redis.ttl(key);
      res.setHeader('Retry-After', ttl);
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: ttl,
      });
    }

    next();
  };
};