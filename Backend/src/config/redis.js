import Redis from "ioredis";
import { config } from "./config.js";

/**
 * redisClient
 * Creates a Redis client from REDIS_URL.
 * Used for:
 *   - Caching AI responses
 *   - JWT token blacklisting on logout
 *
 * If Redis is not running locally the server still starts — cache is optional.
 */
const redisClient = new Redis(
  config.redis_url,
  {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    // Stop retrying after the first failure — Redis is optional
    retryStrategy: (times) => {
      if (times >= 1) return null;
      return 200;
    },
  },
);

let _warned = false;

redisClient.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("error", () => {
  if (!_warned) {
    console.warn("⚠️  Redis not available — running without cache/blacklist");
    _warned = true;
  }
});

export default redisClient;
